package handler

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"github.com/MikhailBatsin-code/todo-app-project/backend/pkg/util"
)

func getUserId(ctx *gin.Context) (int, error) {
	userId, ok := ctx.Get(userCtx)
	if !ok {
		util.NewErrorResponse(ctx, http.StatusInternalServerError, "user id not found")
		return 0, errors.New("user id not found")
	}

	id, ok := userId.(int)
	if !ok {
		util.NewErrorResponse(ctx, http.StatusInternalServerError, "user id has invalid type")
		return 0, errors.New("user id has invalid type")
	}

	return id, nil
}

func getParamInt(ctx *gin.Context, param string) (int, error) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		util.NewErrorResponse(ctx, http.StatusBadRequest, err.Error())
		return 0, err
	}

	return id, nil
}
