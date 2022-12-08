package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/MikhailBatsin-code/todo-app-project/backend/pkg/domain"
	"github.com/MikhailBatsin-code/todo-app-project/backend/pkg/util"
)

func (h *Handler) getAllLists(ctx *gin.Context) {
	userId, err := getUserId(ctx)
	if err != nil {
		return
	}

	// getting all lists
	lists, err := h.Services.TodoList.GetAll(userId)
	if err != nil {
		util.NewErrorResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	ctx.JSON(http.StatusOK, util.NewDataResponse(lists))
}

func (h *Handler) getListById(ctx *gin.Context) {
	userId, err := getUserId(ctx)
	if err != nil {
		return
	}

	id, err := getParamInt(ctx, "id")
	if err != nil {
		return
	}

	// getting list by id
	list, err := h.Services.TodoList.GetById(userId, id)
	if err != nil {
		util.NewErrorResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	ctx.JSON(http.StatusOK, list)
}

func (h *Handler) createList(ctx *gin.Context) {
	userId, err := getUserId(ctx)
	if err != nil {
		return
	}

	var input domain.TodoList
	if err := ctx.BindJSON(&input); err != nil {
		util.NewErrorResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	// create todo list
	id, err := h.Services.TodoList.Create(userId, input)
	if err != nil {
		util.NewErrorResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{
		"id": id,
	})
}

func (h *Handler) updateList(ctx *gin.Context) {
	userId, err := getUserId(ctx)
	if err != nil {
		return
	}

	id, err := getParamInt(ctx, "id")
	if err != nil {
		return
	}

	var input domain.UpdateListInput
	if err := ctx.BindJSON(&input); err != nil {
		util.NewErrorResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	// updating list
	if err := h.Services.TodoList.Update(userId, id, input); err != nil {
		util.NewErrorResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	ctx.JSON(http.StatusOK, util.NewResponse("updated successfully"))
}

func (h *Handler) deleteList(ctx *gin.Context) {
	userId, err := getUserId(ctx)
	if err != nil {
		return
	}

	id, err := getParamInt(ctx, "id")
	if err != nil {
		return
	}

	// deleting list by id
	err = h.Services.TodoList.Delete(userId, id)
	if err != nil {
		util.NewErrorResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	ctx.JSON(http.StatusOK, util.NewResponse("ok"))
}
