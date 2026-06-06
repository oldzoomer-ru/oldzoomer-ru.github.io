# Stage 1: Build
FROM node:24-alpine AS build

WORKDIR /app

# Copy only package files first for better caching
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code and config files needed for build
COPY src ./src
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY react-router.config.ts ./
COPY eslint.config.js ./

# Build
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built files to Nginx directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
