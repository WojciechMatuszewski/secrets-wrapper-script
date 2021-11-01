package main

import (
	"context"
	"fmt"

	"github.com/aws/aws-lambda-go/lambda"
)

func main() {
	h := NewHandler()
	lambda.Start(h)
}

type Handler func(ctx context.Context) error

func NewHandler() Handler {
	return func(ctx context.Context) error {
		fmt.Println("Inside the handler")
		return nil
	}
}
