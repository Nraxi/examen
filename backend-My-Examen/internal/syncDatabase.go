package internal

import "Backend/models"

func SyncDataBase() {
	DB.AutoMigrate(&models.Pirate{})
	DB.AutoMigrate(&models.Albumet{})
}
