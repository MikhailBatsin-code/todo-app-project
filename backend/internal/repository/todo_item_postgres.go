package repository

import (
	"fmt"
	"strings"

	"github.com/jmoiron/sqlx"

	"github.com/MikhailBatsin-code/todo-proj/backend/pkg/db"
	"github.com/MikhailBatsin-code/todo-proj/backend/pkg/domain"
)

type TodoItemPostgres struct {
	db *sqlx.DB
}

func NewTodoItemPostgresRepo(db *sqlx.DB) *TodoItemPostgres {
	return &TodoItemPostgres{
		db,
	}
}

func (r *TodoItemPostgres) Create(listId int, item domain.TodoItem) (int, error) {
	tx, err := r.db.Begin()
	if err != nil {
		return 0, err
	}

	var itemId int
	createItemQuery := fmt.Sprintf("INSERT INTO %s (title, description) VALUES($1, $2) RETURNING id", db.TodoItemsTable)

	row := tx.QueryRow(createItemQuery, item.Title, item.Description)
	if err := row.Scan(&itemId); err != nil {
		tx.Rollback()
		return 0, err
	}

	createListsItemQuery := fmt.Sprintf("INSERT INTO %s (list_id, item_id) VALUES($1, $2)", db.ListsItemsTable)
	if _, err := tx.Exec(createListsItemQuery, listId, itemId); err != nil {
		tx.Rollback()
		return 0, err
	}

	return itemId, tx.Commit()
}

func (r *TodoItemPostgres) GetAll(userId, listId int) ([]domain.TodoItem, error) {
	var items []domain.TodoItem
	query := fmt.Sprintf(`SELECT ti.id, ti.title, ti.description, ti.done from %s ti 
							INNER JOIN %s li ON li.item_id=ti.id 
							INNER JOIN %s ul ON ul.list_id=li.list_id
							WHERE li.list_id=$1 AND ul.user_id=$2`,
		db.TodoItemsTable, db.ListsItemsTable, db.UsersListsTable)

	if err := r.db.Select(&items, query, listId, userId); err != nil {
		return nil, err
	}

	return items, nil
}

func (r *TodoItemPostgres) GetById(userId, itemId int) (domain.TodoItem, error) {
	var item domain.TodoItem
	query := fmt.Sprintf(`SELECT ti.id, ti.title, ti.description, ti.done from %s ti 
							INNER JOIN %s li ON li.item_id=ti.id 
							INNER JOIN %s ul ON ul.list_id=li.list_id
							WHERE ti.id=$1 AND ul.user_id=$2`,
		db.TodoItemsTable, db.ListsItemsTable, db.UsersListsTable)

	if err := r.db.Get(&item, query, itemId, userId); err != nil {
		return item, err
	}

	return item, nil
}

func (r *TodoItemPostgres) Delete(userId, itemId int) (err error) {
	query := fmt.Sprintf(`DELETE FROM %s ti USING %s li, %s ul 
							WHERE ti.id=li.item_id 
							AND li.list_id=ul.list_id 
							AND ul.user_id = $1
							AND ti.id = $2`,
		db.TodoItemsTable, db.ListsItemsTable, db.UsersListsTable)

	_, err = r.db.Exec(query, userId, itemId)
	return
}

func (r *TodoItemPostgres) Update(userId, itemId int, item domain.UpdateItemInput) error {
	setValues := make([]string, 0)
	args := make([]interface{}, 0)
	argId := 1

	if item.Title != nil {
		setValues = append(setValues, fmt.Sprintf("title=$%d", argId))
		args = append(args, *item.Title)
		argId++
	}
	if item.Description != nil {
		setValues = append(setValues, fmt.Sprintf("description=$%d", argId))
		args = append(args, *item.Description)
		argId++
	}
	if item.Done != nil {
		setValues = append(setValues, fmt.Sprintf("done=$%d", argId))
		args = append(args, *item.Done)
		argId++
	}

	setString := strings.Join(setValues, ", ")
	query := fmt.Sprintf(
		`UPDATE %s ti SET %s FROM %s li, %s ul 
			WHERE li.list_id=ul.list_id 
			AND li.item_id=$%d 
			AND ul.user_id=$%d
			AND ti.id=li.item_id`,
		db.TodoItemsTable,
		setString,
		db.ListsItemsTable,
		db.UsersListsTable,
		argId,
		argId+1,
	)
	args = append(args, itemId, userId)

	_, err := r.db.Exec(query, args...)
	return err
}
