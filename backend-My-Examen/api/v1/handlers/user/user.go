package user

import (
	"Backend/api/v1/middleware"
	"Backend/internal"
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// Find all users in DB
func FindAllUsers(c *gin.Context) {

	// Check if the user is authenticated
	if err := middleware.RequireAuth(c); err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	users := []models.Pirate{}
	result := internal.DB.Find(&users)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}
	c.JSON(200, gin.H{
		"users": users,
	})
}

// Find user by Id
func FindUserById(c *gin.Context) {
	// Check if the user is authenticated
	if err := middleware.RequireAuth(c); err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}
	//Get Id off url
	id := c.Param("id")
	//get the User
	var userbyid models.Pirate
	result := internal.DB.First(&userbyid, id)
	//Respond
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}
	c.JSON(200, gin.H{
		"users": userbyid,
	})

}

// Update User
func UpdateUser(c *gin.Context) {

	// Check if user is authenticated
	if err := middleware.RequireAuth(c); err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}
	//Get id of url
	id := c.Param("id")
	//Get the data off req body
	var User struct {
		Idn      int
		Name     string
		Email    string
		Password string
	}

	c.Bind(&User)
	//find the post were updating
	var user models.Pirate
	result := internal.DB.First(&user, id)

	//check for errors
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}

	//update it
	internal.DB.Model(&user).Updates(models.Pirate{
		Idn:      User.Idn,
		Name:     User.Name,
		Email:    User.Email,
		Password: User.Password,
	})

	// Respond with it
	c.JSON(200, gin.H{
		"user": user,
	})
}

// Delete User
func DeleteUser(c *gin.Context) {
	// Check if user is authenticated
	if err := middleware.RequireAuth(c); err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}
	//Get the id off the url
	id := c.Param("id")
	//delete the post
	result := internal.DB.Delete(&models.Pirate{}, id)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}
	//respond
	c.JSON(http.StatusOK, gin.H{"message": "User deleted"})

}

//UPDATE PASSWORD AND CHECK IF ITS MATCH THE EMAIL BEFORE accepting the new pass

func UpdatePassword(c *gin.Context) {

	// Check if user is authenticated
	if err := middleware.RequireAuth(c); err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	// Get user ID from URL parameter
	id := c.Param("id")

	// Get the new password from the request body
	var updateReq struct {
		Email           string `json:"email"`
		OldPassword     string `json:"old_password"`
		NewPassword     string `json:"new_password"`
		ConfirmPassword string `json:"confirm_password"`
	}
	if err := c.BindJSON(&updateReq); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	// Check if the email and password match before updating the user's password
	var user models.Pirate
	result := internal.DB.Where("id = ?", id).First(&user)
	if result.Error != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}
	if user.Email != updateReq.Email {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Email does not match"})
		return
	}
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(updateReq.OldPassword)); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Incorrect password"})
		return
	}
	if updateReq.NewPassword != updateReq.ConfirmPassword {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "New password and confirm password do not match"})
		return
	}

	// Hash the new password and update the user's password in the database
	hash, err := bcrypt.GenerateFromPassword([]byte(updateReq.NewPassword), 10)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	}
	internal.DB.Model(&user).Update("Password", string(hash))

	// Respond with success message
	c.JSON(http.StatusOK, gin.H{"message": "Password updated successfully"})
}
