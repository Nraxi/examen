package models

import (
	"gorm.io/gorm"
)

type Pirate struct {
	gorm.Model
	Idn      int    `json:"idn"`
	Name     string `json:"name"`
	Email    string `json:"email" gorm:"unique"`
	Password string `json:"password"`
}
