package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Stock struct {
	StockID     string  `bson:"stockId" json:"stockId"`
	Quantity    float64 `bson:"quantity" json:"quantity"`
	TotalAmount float64 `bson:"total_amount" json:"total_amount"`
}

// User represents the user schema for the database
type User struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	FirstName string             `bson:"fname" json:"firstName"`
	LastName  string             `bson:"lname" json:"lastName"`
	Email     string             `bson:"email" json:"email"`
	Password  string             `bson:"password" json:"password"`
	UserType  string             `bson:"userType" json:"userType"`
	Credits   float64                `bson:"credits" json:"credits"`
	Stocks    []Stock            `bson:"stocks" json:"stocks"`
}
