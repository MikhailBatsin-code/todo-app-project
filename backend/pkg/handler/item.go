package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/MikhailBatsin-code/todo-proj/backend/pkg/domain"
	"github.com/MikhailBatsin-code/todo-proj/backend/pkg/util"
)

func (h *Handler) getAllItems(ctx *gin.Context) {
	userId, err := getUserId(ctx)
	if err != nil {
		return
	}

	listId, err := getParamInt(ctx, "id")
	if err != nil {
		return
	}

	items, err := h.Services.TodoItem.GetAll(userId, listId)
	if err != nil {
		util.NewErrorResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	ctx.JSON(http.StatusOK, util.NewDataResponse(items))
}

func (h *Handler) getItemById(ctx *gin.Context) {
	userId, err := getUserId(ctx)
	if err != nil {
		return
	}

	itemId, err := getParamInt(ctx, "id")
	if err != nil {
		return
	}

	item, err := h.Services.TodoItem.GetById(userId, itemId)
	if err != nil {
		util.NewErrorResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	ctx.JSON(http.StatusOK, item)
}

func (h *Handler) createItem(ctx *gin.Context) {
	userId, err := getUserId(ctx)
	if err != nil {
		return
	}

	listId, err := getParamInt(ctx, "id")
	if err != nil {
		return
	}

	var input domain.TodoItem
	if err := ctx.Bind(&input); err != nil {
		util.NewErrorResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	id, err := h.Services.TodoItem.Create(userId, listId, input)
	if err != nil {
		util.NewErrorResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{
		"id": id,
	})
}

func (h *Handler) updateItem(ctx *gin.Context) {
	userId, err := getUserId(ctx)
	if err != nil {
		return
	}

	id, err := getParamInt(ctx, "id")
	if err != nil {
		return
	}

	var input domain.UpdateItemInput
	if err := ctx.BindJSON(&input); err != nil {
		util.NewErrorResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	// updating list
	if err := h.Services.TodoItem.Update(userId, id, input); err != nil {
		util.NewErrorResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	ctx.JSON(http.StatusOK, util.NewResponse("updated successfully"))
}

func (h *Handler) deleteItem(ctx *gin.Context) {
	userId, err := getUserId(ctx)
	if err != nil {
		return
	}

	itemId, err := getParamInt(ctx, "id")
	if err != nil {
		return
	}

	err = h.Services.TodoItem.Delete(userId, itemId)
	if err != nil {
		util.NewErrorResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	ctx.JSON(http.StatusFound, util.NewResponse("ok"))
}
