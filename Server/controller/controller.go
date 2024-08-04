package controller

import (
	"context"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/NishantBansal2003/Brokerax/metrics"
	"github.com/NishantBansal2003/Brokerax/model"
	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"github.com/prometheus/client_golang/prometheus"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt"
)

var (
	_           = godotenv.Load(".env")
	SECRET_KEY  = os.Getenv("SECRET_KEY")
	MONGODB_URI = os.Getenv("MONGODB_URI")
)

const (
	dbName  = "BrokeraxProd"
	colName = "UserInfo"
)

var collection *mongo.Collection

func Connect() {
	// Special method runs first and one time only
	clientOptions := options.Client().ApplyURI(MONGODB_URI).
		SetMaxPoolSize(50).
		SetServerSelectionTimeout(2 * time.Second)

		// Connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal("Error connecting to MongoDB:", err)
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal("Error pinging MongoDB:", err)
	}
	fmt.Println("Connected to MongoDB!")
	collection = client.Database(dbName).Collection(colName)
	fmt.Println("Collection reference is ready!")
}

// MongoDB helpers
func insertNewUser(newUser model.User) {
	inserted, err := collection.InsertOne(context.Background(), newUser)
	if err != nil {
		log.Fatal("Error creating user ", err)
	}
	fmt.Println("Inserted new User", inserted)
}

func findUser(email string) (*model.User, error) {
	filter := bson.D{{Key: "email", Value: email}}
	var result model.User
	err := collection.FindOne(context.Background(), filter).Decode(&result)
	if err != nil {
		return nil, err
	}

	return &result, nil
}

func FindUserByID(ID primitive.ObjectID) (*model.User, error) {
	filter := bson.D{{Key: "_id", Value: ID}}
	var result model.User
	err := collection.FindOne(context.Background(), filter).Decode(&result)
	if err != nil {
		return nil, err
	}

	return &result, nil
}

type FindUserByIDAndStocksRequest struct {
	ID      primitive.ObjectID
	StockID string
}

func FindUserByIDAndStocks(userData FindUserByIDAndStocksRequest) (*model.User, error) {
	filter := bson.D{
		{Key: "_id", Value: userData.ID},
		{Key: "stocks", Value: bson.M{"$elemMatch": bson.M{"stockId": userData.StockID}}},
	}
	var result model.User
	err := collection.FindOne(context.Background(), filter).Decode(&result)
	if err != nil {
		return nil, err
	}
	return &result, nil
}

func updateUserData(userData FindUserByIDAndStocksRequest, quantity float64, currentPrice float64) (*mongo.UpdateResult, error) {
	filter := bson.D{
		{Key: "_id", Value: userData.ID},
		{Key: "stocks", Value: bson.M{"$elemMatch": bson.M{"stockId": userData.StockID}}},
	}
	update := bson.D{
		{Key: "$inc", Value: bson.M{
			"stocks.$.quantity":     quantity,
			"credits":               -currentPrice,
			"stocks.$.total_amount": currentPrice,
		}},
	}
	updateResult, err := collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return nil, err
	}

	return updateResult, nil
}

func FindOneUserAndUpdateIt(userId primitive.ObjectID, stockId string, quantity float64, currentPrice float64) (*model.User, error) {
	filter := bson.D{
		{Key: "_id", Value: userId},
	}
	update := bson.D{
		{Key: "$addToSet", Value: bson.M{
			"stocks": bson.M{
				"stockId":      stockId,
				"quantity":     quantity,
				"total_amount": currentPrice,
			},
		}},
		{Key: "$inc", Value: bson.M{
			"credits": -currentPrice,
		}},
	}
	options := options.FindOneAndUpdate().SetReturnDocument(options.After)

	// Perform the update
	var updatedUser model.User
	err := collection.FindOneAndUpdate(context.TODO(), filter, update, options).Decode(&updatedUser)
	if err != nil {
		return nil, err
	}

	return &updatedUser, nil
}

func removeStocksAndUpdate(userData FindUserByIDAndStocksRequest, newQuantity float64, currentPrice float64, newTotalAmount float64) (*mongo.UpdateResult, error) {
	filter := bson.D{
		{Key: "_id", Value: userData.ID},
		{Key: "stocks", Value: bson.M{"$elemMatch": bson.M{"stockId": userData.StockID}}},
	}
	update := bson.D{
		{Key: "$set", Value: bson.M{
			"stocks.$.quantity":     newQuantity,
			"stocks.$.total_amount": newTotalAmount,
		}},
		{Key: "$inc", Value: bson.M{
			"credits": currentPrice,
		}},
	}

	// Perform the update
	updateResult, err := collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return nil, err
	}

	return updateResult, nil
}

func updateUserStockList(userId primitive.ObjectID, stockId string, currentPrice float64) (*mongo.UpdateResult, error) {
	filter := bson.D{
		{Key: "_id", Value: userId},
	}

	// Create the update
	update := bson.D{
		{Key: "$inc", Value: bson.M{
			"credits": currentPrice,
		}},
		{Key: "$pull", Value: bson.M{
			"stocks": bson.M{
				"stockId": stockId,
			},
		}},
	}
	// Perform the update
	updateResult, err := collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return nil, err
	}

	return updateResult, nil
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
type Claims struct {
	UserID string `json:"userId"`
	Email  string `json:"email"`
	jwt.StandardClaims
}

func GenerateToken(userIDp primitive.ObjectID, email string) (string, error) {
	userID := userIDp.Hex()
	claims := Claims{
		UserID: userID,
		Email:  email,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour).Unix(), // Token expires in 1 hour
		},
	}

	// Create a new token with the claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Sign the token with the secret key
	signedToken, err := token.SignedString([]byte(SECRET_KEY))
	if err != nil {
		return "", err
	}

	return signedToken, nil
}

func Login(c *fiber.Ctx) error {
	// Start timer for request duration
	timer := prometheus.NewTimer(metrics.HttpRequestDuration.WithLabelValues("/api/auth/login"))
	defer timer.ObserveDuration()

	// Increment the request counter
	metrics.HttpRequestsTotal.WithLabelValues("/api/auth/login").Inc()
	var data LoginRequest

	// Parse the request body into the data struct
	if err := c.BodyParser(&data); err != nil {
		// If parsing fails, fallback to query parameters
		data.Email = c.Query("email")
		data.Password = c.Query("password")

	}
	existingUser, err := findUser(data.Email)
	if existingUser == nil || err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"error":   "Error finding user",
			"detail":  err.Error(), // Include the error message
		})
	}
	// Decrytping password
	err = bcrypt.CompareHashAndPassword([]byte(existingUser.Password), []byte(data.Password))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"error":   "Wrong details Please Check Once",
		})
	}

	token, err := GenerateToken(existingUser.ID, existingUser.Email)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"error":   "Issue while generating token, Please Try Again!",
		})
	}
	return c.JSON(fiber.Map{
		"success": true,
		"data": fiber.Map{
			"userId":     existingUser.ID,
			"email":      existingUser.Email,
			"token":      token,
			"first_name": existingUser.FirstName,
			"last_name":  existingUser.LastName,
		},
	})
}

type SignUpRequest struct {
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}

func ConvertToUser(req SignUpRequest) *model.User {
	return &model.User{
		ID:        primitive.NewObjectID(),
		FirstName: req.FirstName,
		LastName:  req.LastName,
		Email:     req.Email,
		Password:  req.Password,
		UserType:  "regular",
		Credits:   1000000,
		Stocks:    []model.Stock{},
	}
}

func Signup(c *fiber.Ctx) error {
	// Start timer for request duration
	timer := prometheus.NewTimer(metrics.HttpRequestDuration.WithLabelValues("/api/auth/signup"))
	defer timer.ObserveDuration()
	
	// Increment the request counter
	metrics.HttpRequestsTotal.WithLabelValues("/api/auth/signup").Inc()
	var data SignUpRequest

	// Parse the request body into the data struct
	if err := c.BodyParser(&data); err != nil {
		// If parsing fails, fallback to query parameters
		data.FirstName = c.Query("firstName")
		data.LastName = c.Query("lastName")
		data.Email = c.Query("email")
		data.Password = c.Query("password")
	}
	_, err := findUser(data.Email)
	if err == nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"error":   "User Already Exists",
		})
	}
	newUser := *ConvertToUser(data)
	// Encrytping Password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"error":   "Error Encrypting password",
		})
	}
	newUser.Password = string(hashedPassword)
	insertNewUser(newUser)
	token, err := GenerateToken(newUser.ID, newUser.Email)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"error":   "Issue while generating token, Please Try Again!",
		})
	}
	return c.JSON(fiber.Map{
		"success": true,
		"data": fiber.Map{
			"userId":     newUser.ID,
			"email":      newUser.Email,
			"token":      token,
			"first_name": newUser.FirstName,
			"last_name":  newUser.LastName,
		},
	})
}

type PortfolioRequest struct {
	UserId string `json:"userId"`
}

func Portfolio(c *fiber.Ctx) error {
	// Start timer for request duration
	timer := prometheus.NewTimer(metrics.HttpRequestDuration.WithLabelValues("/api/user/portfolio"))
	defer timer.ObserveDuration()
	
	// Increment the request counter
	metrics.HttpRequestsTotal.WithLabelValues("/api/user/portfolio").Inc()
	var data PortfolioRequest
	if err := c.BodyParser(&data); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"error":   "Invalid request body",
		})
	}
	userId, err := primitive.ObjectIDFromHex(data.UserId)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"Status":  "Invalid ID format",
			"Error":   err.Error(),
			"Data":    data.UserId,
		})
	}
	userData, err := FindUserByID(userId)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"error":   "No User found",
			"Data":    userId,
		})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"data": fiber.Map{
			"stocks":  userData.Stocks,
			"credits": userData.Credits,
		},
	})
}

type StockRequest struct {
	UserId        string  `json:"userId"`
	StockId       string  `json:"stockId"`
	Current_price string  `json:"current_price"`
	Quantity      float64 `json:"quantity"`
}

func AddStock(c *fiber.Ctx) error {
	// Start timer for request duration
	timer := prometheus.NewTimer(metrics.HttpRequestDuration.WithLabelValues("/api/user/stock/add"))
	defer timer.ObserveDuration()
	
	// Increment the request counter
	metrics.HttpRequestsTotal.WithLabelValues("/api/user/stock/add").Inc()
	var data StockRequest
	if err := c.BodyParser(&data); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"error":   "Invalid request body",
		})
	}
	userIdstr := strings.ReplaceAll(data.UserId, `"`, "")
	userIdstr = strings.ReplaceAll(userIdstr, `'`, "")
	currentPrice, err := strconv.ParseFloat(data.Current_price, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"error":   "Unable to parse price",
		})
	}
	quantity := data.Quantity
	userId, err := primitive.ObjectIDFromHex(userIdstr)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"Status":  "Invalid ID format",
			"Error":   err.Error(),
			"Data":    data.UserId,
		})
	}
	userData, err := FindUserByID(userId)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"error":   "No User found",
			"Data":    userId,
		})
	}
	if userData.Credits-currentPrice < 0 {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"error":   "Insufficient Credits",
		})
	}
	req := FindUserByIDAndStocksRequest{
		ID:      userId,
		StockID: data.StockId,
	}
	_, err = FindUserByIDAndStocks(req)
	if err == nil {
		_, err := updateUserData(req, quantity, currentPrice)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"success": false,
				"error":   "No User found",
			})
		}
	} else {
		_, err := FindOneUserAndUpdateIt(userId, data.StockId, quantity, currentPrice)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"success": false,
				"error":   "No User found",
			})
		}
	}
	updatrdUser, err := FindUserByID((userId))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"error":   "No User found",
		})
	}
	return c.JSON(fiber.Map{
		"success": true,
		"data": fiber.Map{
			"stocks":  updatrdUser.Stocks,
			"credits": updatrdUser.Credits,
		},
	})
}

func findStockByID(user *model.User, stockId string) *model.Stock {
	for _, stock := range user.Stocks {
		if stock.StockID == stockId {
			return &stock
		}
	}
	return nil
}

func RemoveStock(c *fiber.Ctx) error {
	// Start timer for request duration
	timer := prometheus.NewTimer(metrics.HttpRequestDuration.WithLabelValues("/api/user/stock/remove"))
	defer timer.ObserveDuration()
	
	// Increment the request counter
	metrics.HttpRequestsTotal.WithLabelValues("/api/user/stock/remove").Inc()
	var data StockRequest
	if err := c.BodyParser(&data); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"error":   "Invalid request body",
		})
	}
	userIdstr := strings.ReplaceAll(data.UserId, `"`, "")
	userIdstr = strings.ReplaceAll(userIdstr, `'`, "")
	currentPrice, err := strconv.ParseFloat(data.Current_price, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"error":   "Invalid request body",
		})
	}
	quantity := data.Quantity
	userId, err := primitive.ObjectIDFromHex(userIdstr)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"Status":  "Invalid ID format",
			"Error":   err.Error(),
			"Data":    data.UserId,
		})
	}
	req := FindUserByIDAndStocksRequest{
		ID:      userId,
		StockID: data.StockId,
	}
	user, err := FindUserByIDAndStocks(req)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"error":   "No User Found",
		})
	}
	stock := findStockByID(user, data.StockId)
	newQuantity := stock.Quantity - quantity
	newTotalAmount := stock.TotalAmount - currentPrice
	if newQuantity > 0 && newTotalAmount >= 10 {
		_, err := removeStocksAndUpdate(req, newQuantity, currentPrice, newTotalAmount)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"success": false,
				"error":   "Invalid Stock Operation",
			})
		}
	} else {
		currentPrice = stock.TotalAmount
		_, err := updateUserStockList(userId, data.StockId, currentPrice)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"success": false,
				"error":   "Invalid Stock Operation",
			})
		}
	}
	updatrdUser, err := FindUserByID((userId))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"error":   "No User found",
		})
	}
	return c.JSON(fiber.Map{
		"success": true,
		"data": fiber.Map{
			"stocks":      updatrdUser.Stocks,
			"credits":     updatrdUser.Credits,
			"amount_left": newTotalAmount,
		},
	})
}
