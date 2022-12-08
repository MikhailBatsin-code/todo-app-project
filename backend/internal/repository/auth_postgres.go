package repository

import (
	"fmt"

	"github.com/jmoiron/sqlx"

	"github.com/MikhailBatsin-code/todo-app-project/backend/pkg/db"
	"github.com/MikhailBatsin-code/todo-app-project/backend/pkg/domain"
)

type AuthPostgres struct {
	db *sqlx.DB
}

func NewAuthPostgresRepo(db *sqlx.DB) *AuthPostgres {
	return &AuthPostgres{db}
}

func (r *AuthPostgres) CreateUser(user domain.User) (id int, err error) {
	query := fmt.Sprintf("INSERT INTO %s(name, username, password_hash) VALUES ($1, $2, $3) RETURNING id", db.UsersTable)
	row := r.db.QueryRow(query, user.Name, user.Username, user.Password)
	err = row.Scan(&id)

	if err != nil {
		return 0, err
	}

	return id, nil
}

func (r *AuthPostgres) GetUser(username, password string) (domain.User, error) {
	var user domain.User
	query := fmt.Sprintf("SELECT id FROM %s WHERE username=$1 AND password_hash=$2", db.UsersTable)
	err := r.db.Get(&user, query, username, password)

	return user, err
}
