package jwt

import (
	"Backend/internal"
	"Backend/models"
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func RefreshTokenEndpoint(c *gin.Context) error {
	// // Get the cookie
	refreshToken, err := c.Cookie("RefreshToken")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Unauthorized",
		})
		return err
	}

	// // Parse the token string and a function for looking for the key.
	token, err := jwt.Parse(refreshToken, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		// hmacSampleSecret is a []byte containing your incl secret key
		return []byte(os.Getenv("RefSECERET")), nil
	})

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Unauthorized2",
		})
		return err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid Token",
		})
		return err
	}

	if userID, ok := claims["sub"].(float64); ok {
		var user models.Pirate
		err := internal.DB.First(&user, userID).Error
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid user"})
			return err
		}
		fmt.Println("USERID", userID)

		// run through your business logic to verify if the user can log in

		newTokenPair, err := GenerateTokenPair(c, uint(userID))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to generate token pair"})
			return err
		}

		c.SetCookie("AccessToken", newTokenPair["AccessToken"], 900, "", "", false, true)
		c.SetCookie("RefreshToken", newTokenPair["RefreshToken"], 3600*24*7, "", "", false, true)
		c.JSON(http.StatusOK, gin.H{
			"access_token":  newTokenPair["AccessToken"],
			"refresh_token": newTokenPair["RefreshToken"],
		})
		return nil
	}

	c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid user ID"})
	return fmt.Errorf("invalid user ID")
}
