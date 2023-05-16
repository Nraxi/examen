package handlers_v2

import (
	"Backend/internal"
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetAlbum(c *gin.Context) {

	c.JSON(http.StatusOK, models.Albumettwo{
		Price:  123,
		Title:  "title",
		Artist: "artist",
		ID:     "id",
	})
}

func GetAlbums(c *gin.Context) {
	c.JSON(http.StatusOK, models.Albumtwos)
}

func GetAlbumset(c *gin.Context) {
	var albumets []models.Albumet
	internal.DB.Find(&albumets)

	c.JSON(http.StatusOK, gin.H{
		"albums": albumets,
	})
}

func PostAlbums(c *gin.Context) {
	var newAlbum models.Albumet

	// Call BindJSON to bind the received JSON to
	// newAlbum.
	if err := c.ShouldBindJSON(&newAlbum); err != nil {
		return
	}

	// Add the new album to the slice.
	models.Albums = append(models.Albums, newAlbum)
	c.IndentedJSON(http.StatusCreated, newAlbum)
}
