package service

import (
	"github.com/MikhailBatsin-code/todo-app-project/backend/pkg/domain"
	"github.com/MikhailBatsin-code/todo-app-project/backend/pkg/repository"
)

type TodoItemService struct {
	repo     repository.TodoItem
	listRepo repository.TodoList
}

func NewTodoItemService(repo repository.TodoItem, listRepo repository.TodoList) *TodoItemService {
	return &TodoItemService{
		repo,
		listRepo,
	}
}

func (s *TodoItemService) Create(userId, listId int, item domain.TodoItem) (int, error) {
	_, err := s.listRepo.GetById(userId, listId)
	if err != nil {
		// list doesn't exist
		return 0, err
	}

	return s.repo.Create(listId, item)
}

func (s *TodoItemService) GetAll(userId, listId int) ([]domain.TodoItem, error) {
	return s.repo.GetAll(userId, listId)
}

func (s *TodoItemService) GetById(userId, itemId int) (domain.TodoItem, error) {
	return s.repo.GetById(userId, itemId)
}

func (s *TodoItemService) Delete(userId, itemId int) error {
	return s.repo.Delete(userId, itemId)
}

func (s *TodoItemService) Update(userId, itemId int, item domain.UpdateItemInput) error {
	if err := item.Validate(); err != nil {
		return err
	}
	return s.repo.Update(userId, itemId, item)
}
