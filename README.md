# oldzoomer-ru.github.io

Мой хоумпейдж на React

## Развертывание

### GitHub Pages

Автоматическое развертывание на GitHub Pages происходит при пуше в ветку `master` через GitHub Actions.

### Docker

Для локального развертывания:

```bash
# Базовая сборка и запуск
docker-compose up --build -d

# Production сборка (оптимизированная)
docker-compose -f docker-compose.prod.yml up --build -d

# С переменными окружения
cp .env.example .env
# Отредактируйте .env файл
docker-compose up --build -d
```

### Локальная разработка

```bash
# Установка зависимостей
cd react-site
npm install

# Запуск dev сервера
npm start

# Или с помощью Makefile
make install
make dev
```

### Быстрые команды с Makefile

```bash
make help           # Показать все доступные команды
make dev           # Запустить разработку
make build         # Собрать приложение
make docker-dev    # Запустить через Docker (development)
make docker-prod   # Запустить через Docker (production)
make clean         # Очистить кэш и образы
```

## Структура проекта

- `react-site/` - React приложение
- `.github/workflows/` - GitHub Actions для CI/CD
  - `gh-pages.yml` - Развертывание на GitHub Pages
  - `docker-build.yml` - Тестирование сборки Docker
- `Dockerfile` - Конфигурация Docker для разработки
- `Dockerfile.prod` - Оптимизированная конфигурация для production
- `nginx.conf` - Конфигурация Nginx для SPA
- `docker-compose.yaml` - Композиция для разработки
- `docker-compose.prod.yml` - Композиция для production
- `.env.example` - Пример переменных окружения
