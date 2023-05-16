package middleware

import (
	"Backend/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

// func Validate(c *gin.Context) {
// 	r := models.Response(http.StatusOK, "success", gin.H{"user": "John Doe"}, c)

// 	println("AUTH hit")

//		c.JSON(http.StatusOK, gin.H{
//			"UserStatus": "user logged in",
//			"status":     "success",
//			"data":       gin.H{"user": r},
//		})
//	}
type UserResponse struct {
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

func Validate(c *gin.Context) {
	println("Validate hit")
	user, ok := c.Get("user")
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
		c.Abort()
		return
	}

	location, err := time.LoadLocation("Europe/Stockholm")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Ops something went wrong",
		})
	}
	models.Response(http.StatusOK, "success", gin.H{

		"Name":      user.(models.Pirate).Name,
		"Email":     user.(models.Pirate).Email,
		"CreatedAt": user.(models.Pirate).CreatedAt.In(location),
		"UpdatedAt": user.(models.Pirate).UpdatedAt.In(location),
		"Options":   gin.H{"userStatus": "user logged in"},
		// Add other fields as needed
	}, c)
}
