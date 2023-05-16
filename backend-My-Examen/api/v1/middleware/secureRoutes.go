package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func SecureRoutes(c *gin.Context) {
	println("SecureRoutes hit")
	_, exists := c.Get("user")
	if !exists {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Authenticated"})
}
