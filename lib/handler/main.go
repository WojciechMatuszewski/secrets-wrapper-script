package main

import (
	"context"
	"fmt"
	"os"

	"github.com/aws/aws-lambda-go/lambda"
)

func main() {
	h := NewHandler()
	lambda.Start(h)
}

type Handler func(ctx context.Context) error

func NewHandler() Handler {
	return func(ctx context.Context) error {
		secretValue, found := os.LookupEnv("SECRET_VALUE")
		if !found {
			panic("SECRET_VALUE not found")
		}

		fmt.Println("Secret value is", secretValue)
		return nil
	}
}
