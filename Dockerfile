# =========================
# Build Angular (front-login)
# =========================
FROM node:18-alpine AS build

WORKDIR /app

# Argumento para escolher o ambiente (ex: docker)
ARG BUILD_ENV=docker

COPY package*.json ./
RUN npm install

COPY . .

# Aqui ele gera a pasta 'dist/login-front' dentro do container
RUN npx ng build --configuration=$BUILD_ENV

# =========================
# Nginx (Servidor Estático)
# =========================
FROM nginx:alpine

# AJUSTADO: O nome no seu angular.json é 'login-front', não 'front-login'
COPY --from=build /app/dist/login-front /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
