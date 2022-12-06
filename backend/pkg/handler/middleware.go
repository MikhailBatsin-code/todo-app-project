package handler

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"

	"github.com/MikhailBatsin-code/todo-proj/backend/pkg/util"
)

const (
	authorizationHeader = "Authorization"
	userCtx             = "userId"
)

func (h *Handler) userIdentity(ctx *gin.Context) {
	header := ctx.GetHeader(authorizationHeader)
	if header == "" {
		util.NewErrorResponse(ctx, http.StatusUnauthorized, "empty auth header")
		return
	}

	headerParts := strings.Split(header, " ")
	if len(headerParts) != 2 {
		util.NewErrorResponse(ctx, http.StatusUnauthorized, "invalid auth header")
		return
	}

	// parse token
	userId, err := h.Services.Authorization.ParseToken(headerParts[1])
	if err != nil {
		util.NewErrorResponse(ctx, http.StatusUnauthorized, err.Error())
		return
	}

	ctx.Set(userCtx, userId)
}
