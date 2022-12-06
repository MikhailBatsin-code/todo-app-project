package service

import (
	"github.com/MikhailBatsin-code/todo-proj/backend/pkg/domain"
	"github.com/MikhailBatsin-code/todo-proj/backend/pkg/repository"
)

type TodoListService struct {
	repo repository.TodoList
}

func NewTodoListService(repo repository.TodoList) *TodoListService {
	return &TodoListService{repo}
}

func (s *TodoListService) Create(userId int, list domain.TodoList) (int, error) {
	return s.repo.Create(userId, list)
}

func (s *TodoListService) GetAll(userId int) ([]domain.TodoList, error) {
	return s.repo.GetAll(userId)
}

func (s *TodoListService) GetById(userId int, listId int) (domain.TodoList, error) {
	return s.repo.GetById(userId, listId)
}

func (s *TodoListService) Delete(userId int, listId int) error {
	return s.repo.Delete(userId, listId)
}

func (s *TodoListService) Update(userId, listId int, list domain.UpdateListInput) error {
	if err := list.Validate(); err != nil {
		return err
	}
	return s.repo.Update(userId, listId, list)
}
