package repository

import (
	"github.com/jmoiron/sqlx"

	"github.com/MikhailBatsin-code/todo-app-project/backend/internal/repository"
	"github.com/MikhailBatsin-code/todo-app-project/backend/pkg/domain"
)

type Authorization interface {
	CreateUser(user domain.User) (int, error)
	GetUser(username, password string) (domain.User, error)
}

type TodoList interface {
	Create(userId int, list domain.TodoList) (int, error)
	GetAll(userId int) ([]domain.TodoList, error)
	GetById(userId int, listId int) (domain.TodoList, error)
	Delete(userId int, listId int) error
	Update(userId, listId int, list domain.UpdateListInput) error
}

type TodoItem interface {
	Create(listId int, item domain.TodoItem) (int, error)
	GetAll(userId, listId int) ([]domain.TodoItem, error)
	GetById(userId, itemId int) (domain.TodoItem, error)
	Delete(userId, itemId int) error
	Update(userId, itemId int, item domain.UpdateItemInput) error
}

type Repository struct {
	Authorization
	TodoList
	TodoItem
}

func NewRepository(db *sqlx.DB) *Repository {
	return &Repository{
		Authorization: repository.NewAuthPostgresRepo(db),
		TodoList:      repository.NewTodoListPostgresRepo(db),
		TodoItem:      repository.NewTodoItemPostgresRepo(db),
	}
}
