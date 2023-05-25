package middleware

import (
	"Backend/internal"
	"Backend/models"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
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

// func Validate(c *gin.Context) {

// 	println("Validate hit")
// 	user, ok := c.Get("user")
// 	if !ok {
// 		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
// 		c.Abort()
// 		return
// 	}

// 	location, err := time.LoadLocation("Europe/Stockholm")
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{
// 			"error": "Ops something went wrong",
// 		})
// 	}
// 	models.Response(http.StatusOK, "success", gin.H{

// 		"Name":      user.(models.Pirate).Name,
// 		"Email":     user.(models.Pirate).Email,
// 		"CreatedAt": user.(models.Pirate).CreatedAt.In(location),
// 		"UpdatedAt": user.(models.Pirate).UpdatedAt.In(location),
// 		"Options":   gin.H{"userStatus": "user logged in"},
// 		// Add other fields as needed
// 	}, c)
// }

func Validate(c *gin.Context) {
	println("Validate hit")

	refreshTokenString, err := c.Cookie("RefreshToken")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
		c.Abort()
		return
	}

	// Parse the refresh token
	refreshToken, err := jwt.Parse(refreshTokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
		return []byte(os.Getenv("RefSECERET")), nil
	})

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
		c.Abort()
		return
	}

	if claims, ok := refreshToken.Claims.(jwt.MapClaims); ok && refreshToken.Valid {
		// Check the exp
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			c.Abort()
			return
		}

		// Find the user with token sub
		var user models.Pirate

		userID := int(claims["sub"].(float64))
		result := internal.DB.First(&user, userID)

		if result.Error != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			c.Abort()
			return
		}

		if user.ID == 0 {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			c.Abort()
			return
		}

		location, err := time.LoadLocation("Europe/Stockholm")
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Ops something went wrong"})
			c.Abort()
			return
		}

		models.Response(http.StatusOK, "success", gin.H{
			"ID":        user.ID,
			"Name":      user.Name,
			"Email":     user.Email,
			"CreatedAt": user.CreatedAt.In(location),
			"UpdatedAt": user.UpdatedAt.In(location),
			"Options":   gin.H{"userStatus": "user logged in"},
			// Add other fields as needed
		}, c)
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
		c.Abort()
		return
	}
}
