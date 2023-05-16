package handlers

import (
	"Backend/internal"
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func Signup(c *gin.Context) {
	println("Sign hit")

	//Get the email/pass req body

	var body struct {
		Email    string
		Password string
		Name     string
	}

	if c.Bind(&body) != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read Body",
		})
		return
	}

	//Hash the password
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to hash password",
		})
		return
	}
	//Create the user
	user := models.Pirate{
		Name:     body.Name,
		Email:    body.Email,
		Password: string(hash)}
	result := internal.DB.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to create User",
		})
		return
	}

	//respond

	c.JSON(http.StatusCreated, gin.H{
		"status": "You have now created ure account",
	})
}
