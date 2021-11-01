package main

import (
	"fmt"
	"net/http"
	"time"
)

func main() {
	fmt.Println("Hi im here")
	time.Sleep(time.Second * 1)
	_, err := http.Get("https://webhook.site/52c58358-59fc-4cb7-a7d7-465024004ac2")
	if err != nil {
		panic(err)
	}
	fmt.Println("After sleep")
}
