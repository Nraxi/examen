package handlers

import (
	"Backend/internal"
	"Backend/models"
	"fmt"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

func Login(c *gin.Context) {
	println("Login hit")

	// Get email and pass off req body
	var body struct {
		Email    string
		Password string
	}

	if c.Bind(&body) != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read Body",
		})
		return
	}
	//Look up requested User
	var user models.Pirate

	internal.DB.First(&user, "email = ?", body.Email)

	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password",
		})
		return
	}

	//Compare sent in pass with saved user pass hash
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password",
		})
		return
	}
	//Generate a jwt token
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["sub"] = user.ID
	claims["name"] = user.Name
	claims["admin"] = true
	claims["exp"] = time.Now().Add(time.Minute * 15).Unix()

	// Sign and get the complete encoded token as a string using the secret
	tokenString, err := token.SignedString([]byte(os.Getenv("SECERET")))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to create Token",
		})
		return
	}

	refreshToken := jwt.New(jwt.SigningMethodHS256)

	rtClaims := refreshToken.Claims.(jwt.MapClaims)
	rtClaims["sub"] = user.ID
	rtClaims["exp"] = time.Now().Add(time.Hour * 1).Unix()

	rt, rerr := refreshToken.SignedString([]byte(os.Getenv("RefSECERET")))

	if rerr != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to create Token",
		})
		return
	}

	useServerCookie, err := strconv.ParseBool(os.Getenv("SET_SERVER_COOKIE"))
	if err != nil {
		fmt.Printf("error parsing: %s", err)
		return
	}
	if useServerCookie {
		// Send it back as a Cookie
		c.SetSameSite(http.SameSiteLaxMode)
		c.SetCookie("AccessToken", tokenString, 900, "", "", false, true)
		c.SetCookie("RefreshToken", rt, 3600*1, "", "", false, true)

		c.JSON(http.StatusOK, gin.H{
			"Login": "Success",
		})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"Login":        "Success",
			"AccessToken":  tokenString,
			"RefreshToken": rt,
		})
	}
}
