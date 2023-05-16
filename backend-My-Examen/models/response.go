package models

import (
	"github.com/gin-gonic/gin"
)

func Response(code int, message string, data interface{}, c *gin.Context) {
	if data == nil {
		c.JSON(code, gin.H{
			"message": message,
		})
		return
	}

	// Check if data is of type models.Pirate
	if user, ok := data.(Pirate); ok {
		c.JSON(code, gin.H{
			"message": message,
			"data": gin.H{
				"data": user,

				// Add other fields as needed
			},
		})
	} else {
		c.JSON(code, gin.H{
			"message": message,
			"data":    data,
		})
	}
}
