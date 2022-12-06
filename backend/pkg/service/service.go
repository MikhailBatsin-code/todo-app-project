package service

import (
	"github.com/MikhailBatsin-code/todo-proj/backend/internal/service"
	"github.com/MikhailBatsin-code/todo-proj/backend/pkg/domain"
	"github.com/MikhailBatsin-code/todo-proj/backend/pkg/repository"
)

type Authorization interface {
	// returns user's id if ok
	CreateUser(user domain.User) (int, error)
	GenerateToken(username, password string) (string, error)
	// returns user's id if ok
	ParseToken(token string) (int, error)
}

type TodoList interface {
	// returns list's id if ok
	Create(userId int, list domain.TodoList) (int, error)
	GetAll(userId int) ([]domain.TodoList, error)
	GetById(userId int, listId int) (domain.TodoList, error)
	Delete(userId int, listId int) error
	Update(userId, listId int, list domain.UpdateListInput) error
}

type TodoItem interface {
	Create(userId, listId int, item domain.TodoItem) (int, error)
	GetAll(userId, listId int) ([]domain.TodoItem, error)
	GetById(userId, itemId int) (domain.TodoItem, error)
	Delete(userId, itemId int) error
	Update(userId, itemId int, item domain.UpdateItemInput) error
}

type Service struct {
	Authorization
	TodoList
	TodoItem
}

func NewService(repos *repository.Repository) *Service {
	return &Service{
		Authorization: service.NewAuthService(repos.Authorization),
		TodoList:      service.NewTodoListService(repos.TodoList),
		TodoItem:      service.NewTodoItemService(repos.TodoItem, repos.TodoList),
	}
}
