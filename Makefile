.PHONY: help dev build prod clean logs

help: ## Показать справку
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

dev: ## Запустить локальную разработку
	cd react-site && npm start

install: ## Установить зависимости
	cd react-site && npm install

build: ## Собрать React приложение
	cd react-site && npm run build

docker-dev: ## Запустить через Docker (development)
	docker-compose up --build -d

docker-prod: ## Запустить через Docker (production)
	docker-compose -f docker-compose.prod.yml up --build -d

docker-stop: ## Остановить Docker контейнеры
	docker-compose down
	docker-compose -f docker-compose.prod.yml down

clean: ## Очистить build директорию и Docker образы
	cd react-site && rm -rf build
	docker system prune -f

logs: ## Показать логи Docker контейнеров
	docker-compose logs -f

test: ## Запустить тесты
	cd react-site && npm test

deploy: build ## Подготовить к развертыванию
	@echo "Build готов для развертывания в react-site/build/"
