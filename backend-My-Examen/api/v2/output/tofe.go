package output

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func ToFe(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"Dir":  "directory",
		"ID":   "Whatsup",
		"name": "frontend",
	})
}
