package main

import (
	"context"
	"os"
	"os/signal"
	"syscall"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"

	"github.com/MikhailBatsin-code/todo-proj/backend/pkg/db"
	"github.com/MikhailBatsin-code/todo-proj/backend/pkg/handler"
	"github.com/MikhailBatsin-code/todo-proj/backend/pkg/repository"
	"github.com/MikhailBatsin-code/todo-proj/backend/pkg/server"
	"github.com/MikhailBatsin-code/todo-proj/backend/pkg/service"
)

func main() {
	logrus.SetFormatter(new(logrus.JSONFormatter))

	if err := initConfig(); err != nil {
		logrus.Fatalf("error while initializing config: %s\n", err.Error())
	}

	if err := godotenv.Load(); err != nil {
		logrus.Fatalf("error while reading .env files: %s\n", err.Error())
	}

	db, err := db.NewPostgresDB(db.Config{
		Host:     viper.GetString("db.host"),
		Port:     viper.GetString("db.port"),
		Username: viper.GetString("db.username"),
		Password: os.Getenv("DB_PASSWORD"),
		DBName:   viper.GetString("db.dbname"),
		SSLMode:  viper.GetString("db.sslmode"),
	})

	if err != nil {
		logrus.Fatalf("error while initializing db connection: %s\n", err.Error())
	}

	repos := repository.NewRepository(db)
	services := service.NewService(repos)
	handlers := handler.NewHandler(services)

	srv := new(server.Server)
	go func() {
		if err := srv.Run(viper.GetString("port"), handlers.InitRoutes()); err != nil {
			logrus.Fatalf("error while running server: %s\n", err.Error())
		}
	}()

	logrus.Print("TodoApp started")

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGTERM, syscall.SIGINT)
	<-quit

	logrus.Print("TodoApp shutting down")

	if err := srv.Shutdown(context.Background()); err != nil {
		logrus.Errorf("error occured while shutting down: %s", err.Error())
	}

	if err := db.Close(); err != nil {
		logrus.Errorf("error occured on db connection closing: %s", err.Error())
	}
}

func initConfig() error {
	viper.AddConfigPath("config")
	viper.SetConfigName("config")
	return viper.ReadInConfig()
}
