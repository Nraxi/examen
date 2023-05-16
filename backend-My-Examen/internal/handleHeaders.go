package internal

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func HandleHeaders() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Only write headers if they haven't been written already
		if !c.Writer.Written() {
			c.Writer.Header().Set("Content-Type", "application/json")
			c.Writer.WriteHeader(http.StatusOK)
		}

		c.Next()
	}
}
