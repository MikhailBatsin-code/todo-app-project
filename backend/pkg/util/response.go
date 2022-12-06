package util

import (
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

type response struct {
	Status string `json:"status"`
}

type dataResponse[T any] struct {
	Data []T `json:"data"`
}

func NewErrorResponse(ctx *gin.Context, statusCode int, message string) {
	logrus.Error(message)
	ctx.AbortWithStatusJSON(statusCode, NewResponse(message))
}

func NewResponse(msg string) response {
	return response{
		Status: msg,
	}
}

func NewDataResponse[T any](data []T) dataResponse[T] {
	return dataResponse[T]{
		data,
	}
}
