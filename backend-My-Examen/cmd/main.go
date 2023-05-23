package main

import (
	"Backend/api/routes"
	"Backend/internal"
	"fmt"
	"os"
	"strconv"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	internal.LoadEnvVariables()
	internal.WaitUntil(internal.ConnectToDB)
	internal.SyncDataBase()

}

func main() {

	r := gin.Default()

	useCors, err := strconv.ParseBool(os.Getenv("FLAG_USE_CORS"))
	if err != nil {
		fmt.Printf("error parsing: %s", err)
		return
	}

	if useCors {
		r.Use(cors.New(cors.Config{
			AllowOrigins:     []string{"http://localhost:3000"},
			AllowMethods:     []string{"POST", "PUT", "GET", "DELETE"},
			AllowHeaders:     []string{"Origin", "Content-Type", "withCredentials"},
			ExposeHeaders:    []string{"Content-Length"},
			AllowCredentials: true,
			MaxAge:           12 * time.Hour,
		}))
	}
	routes.RegisterRoutes(r)
	r.Run()
}
