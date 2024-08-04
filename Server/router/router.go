package router

import (
	"github.com/NishantBansal2003/Brokerax/controller"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {

	// Grouping authentication routes
	auth := app.Group("/api/auth")
	auth.Post("/login", controller.Login)
	auth.Post("/signup", controller.Signup)

	// Grouping user routes
	user := app.Group("/api/user")
	user.Post("/portfolio", controller.Portfolio)
	user.Post("/stock/add", controller.AddStock)
	user.Post("/stock/remove", controller.RemoveStock)
}
