run: 
	go build -o backend cmd/main.go
	./backend

migrate:
	sql-migrate up -config=config/migrations/config.yml

rollback:
	sql-migrate down -config=config/migrations/config.yml
