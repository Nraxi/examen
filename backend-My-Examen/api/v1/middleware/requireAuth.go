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

func RequireAuth(c *gin.Context) error {
	fmt.Println("in middleware")

	//Get the cookie
	tokenString, err := c.Cookie("AccessToken")
	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
		return err
	}

	// Parse takes the token string and a function for looking up the key.
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
		return []byte(os.Getenv("SECERET")), nil
	})

	if err != nil {
		c.AbortWithStatus(401)
		return err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		//Check the exp
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			c.AbortWithStatus(401)
			return err
		}

		//Find the user with token sub
		var User models.Pirate

		userID := int(claims["sub"].(float64))
		result := internal.DB.First(&User, userID)

		if result.Error != nil {
			c.AbortWithStatus(401)
			return err
		}

		if User.ID == 0 {
			c.AbortWithStatus(401)
			return err
		}
		//Attach to req
		c.Set("user", User)
		//Continue
		c.Next()
	} else {
		c.AbortWithStatus(401)
		return err
	}
	return err

}
