package main

import (
	"context"
	"fmt"
	"os"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/secretsmanager"
)

func main() {
	secretArn, found := os.LookupEnv("SECRET_ARN")
	if !found {
		panic("SECRET_ARN not foundss")
	}

	cfg, err := config.LoadDefaultConfig(context.Background())
	if err != nil {
		panic(err)
	}

	smanager := secretsmanager.NewFromConfig(cfg)
	out, err := smanager.GetSecretValue(
		context.Background(),
		&secretsmanager.GetSecretValueInput{
			SecretId: aws.String(secretArn),
		},
	)
	if err != nil {
		panic(err)
	}

	fmt.Println(*out.SecretString)
}
