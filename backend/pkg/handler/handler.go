package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"

	"github.com/MikhailBatsin-code/todo-proj/backend/pkg/service"
)

type Handler struct {
	Services *service.Service
}

func NewHandler(services *service.Service) *Handler {
	return &Handler{
		Services: services,
	}
}

func (h *Handler) InitRoutes() *gin.Engine {
	router := gin.New()

	router.Use(cors.Default())

	auth := router.Group("/auth")
	{
		auth.POST("/sign-up", h.signUp)
		auth.POST("/sign-in", h.signIn)
	}

	api := router.Group("/api", h.userIdentity)
	{
		lists := api.Group("/lists")
		{
			lists.GET("/:id", h.getListById)
			lists.GET("/", h.getAllLists)
			lists.POST("/", h.createList)
			lists.PUT("/:id", h.updateList)
			lists.DELETE("/:id", h.deleteList)

			items := lists.Group("/:id/items")
			{
				items.GET("/", h.getAllItems)
				items.POST("/", h.createItem)
			}
		}

		items := api.Group("/items")
		{
			items.PUT("/:id", h.updateItem)
			items.DELETE("/:id", h.deleteItem)
			items.GET("/:id", h.getItemById)
		}
	}

	return router
}
