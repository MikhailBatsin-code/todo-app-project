package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/MikhailBatsin-code/todo-app-project/backend/pkg/domain"
	"github.com/MikhailBatsin-code/todo-app-project/backend/pkg/util"
)

func (h *Handler) signUp(ctx *gin.Context) {
	var user domain.User

	if err := ctx.Bind(&user); err != nil {
		util.NewErrorResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	id, err := h.Services.Authorization.CreateUser(user)
	if err != nil {
		util.NewErrorResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{
		"id": id,
	})
}

type signInInput struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func (h *Handler) signIn(ctx *gin.Context) {
	var input signInInput

	if err := ctx.Bind(&input); err != nil {
		util.NewErrorResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	token, err := h.Services.Authorization.GenerateToken(input.Username, input.Password)
	if err != nil {
		util.NewErrorResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"token": token,
	})
}
