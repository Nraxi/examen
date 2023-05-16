package internal

import (
	"fmt"
	"os"
	"sync"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectToDB(wg *sync.WaitGroup) {
	fmt.Println("Trying to connect..")
	dsn := os.Getenv("DB")
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	DB = db
	if err != nil {
		fmt.Println("Failed to connect to database, trying again..")
		time.Sleep(time.Second * 3)
		ConnectToDB(wg)

	} else {
		fmt.Println("Success!")
		wg.Done()
	}
}
