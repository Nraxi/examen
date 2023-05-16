package routes

import (
	"Backend/api/v1/handlers"
	jwt "Backend/api/v1/handlers/Jwt"
	"Backend/api/v1/handlers/user"
	"Backend/api/v1/middleware"
	"Backend/api/v2/handlers_v2"
	"Backend/api/v2/output"
	"Backend/api/v3/handlers_v3"
	"Backend/internal"
	"net/http"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {

	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello Server",
		})
	})

	///http://localhost:9000/api
	routes := r.Group("/api")

	routes.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello World, Slash APi",
		})
	})

	//Get from db album api
	routes.GET("/albums", func(c *gin.Context) {
		handlers_v2.GetAlbumset(c)
	})

	routes.POST("albums", func(c *gin.Context) {
		handlers_v2.PostAlbums(c)
	})
	//
	//View single hardcoded
	routes.GET("viewapi", func(c *gin.Context) {
		handlers_v2.GetAlbums(c)
	})

	//View single hardcoded other option
	routes.GET("viewapitwo", func(c *gin.Context) {
		handlers_v2.GetAlbum(c)
	})

	routes.GET("/tofe", func(c *gin.Context) {
		output.ToFe(c)
	})

	routes.GET("/tryme", func(c *gin.Context) {
		handlers_v3.HandlerV3(c)
	})
	///http://localhost:9000/v1/login/
	apione := r.Group("/v1")

	apione.POST("/signup", func(c *gin.Context) {
		handlers.Signup(c)
	})

	apione.POST("/login", func(c *gin.Context) {
		handlers.Login(c)
	})

	apione.POST("/logout", func(c *gin.Context) {
		handlers.Logout(c)
	})

	apione.POST("/refresh", func(c *gin.Context) {
		jwt.RefreshTokenEndpoint(c)
		c.String(http.StatusOK, "Success.")
	})

	//						Wall of secure routes
	//http://localhost:9000/admin/getuser/1 exmpl
	admin := r.Group("/admin")
	admin.Use(internal.HandleHeaders())

	admin.GET("/auth", func(c *gin.Context) {
		middleware.RequireAuth(c)
		middleware.Validate(c)
	})

	admin.GET("/getusers", func(c *gin.Context) {
		middleware.RequireAuth(c)
		middleware.SecureRoutes(c)
		user.FindAllUsers(c)
	})

	admin.GET("/getuser/:id", func(c *gin.Context) {
		middleware.RequireAuth(c)
		middleware.SecureRoutes(c)
		user.FindUserById(c)
	})

	admin.PUT("/updateuser/:id", func(c *gin.Context) {
		middleware.RequireAuth(c)
		middleware.SecureRoutes(c)
		user.UpdateUser(c)
	})

	admin.PUT("/updatepassword/:id", func(c *gin.Context) {
		middleware.RequireAuth(c)
		middleware.SecureRoutes(c)
		user.UpdatePassword(c)
	})

	admin.DELETE("/deleteuser/:id", func(c *gin.Context) {
		middleware.RequireAuth(c)
		middleware.SecureRoutes(c)
		user.DeleteUser(c)
	})

}
