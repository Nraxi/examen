package handlers_v3

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func HandlerV3(c *gin.Context) {
	c.JSON(http.StatusOK, models.Apier{
		Options: []models.Options{{
			Name:    "",
			GrownUp: false,
			Version: []string{
				"v1",
				"v2",
				"v3",
			},
			SecondOptions: []models.SecondOptions{{}},
		}},
	})
}

// func HandlerV3(c *gin.Context) {
// 	c.JSON(http.StatusOK, models.Options{
// 		Name:       "",
// 		GrownUp: false,
// 		Version: []models.Version{
// 			{V1: 1234,
// 				V2: 3456,
// 				V3: 3456},
// 		},
// 		SecondOptions: []models.SecondOptions{{
//	 		Gender: false,
// 			Human:                      false,
// 			Age: 											false,
// 			Quantity:                  3,
// 			Name:                      "",
// 		}},
// 	})
// }
