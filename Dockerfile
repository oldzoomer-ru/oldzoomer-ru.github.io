# Многоэтапная сборка React приложения
FROM node:18-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY react-site/package*.json ./

# Устанавливаем зависимости
RUN npm ci --only=production

# Копируем исходный код
COPY react-site/ ./

# Собираем приложение
RUN npm run build

# Второй этап - nginx для раздачи статических файлов
FROM nginx:stable-alpine

# Копируем собранное приложение в nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Копируем конфигурацию nginx для SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
