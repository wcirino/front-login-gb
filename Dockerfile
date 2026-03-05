# =========================
# Build Angular (front-login)
# =========================
FROM node:18-alpine AS build

WORKDIR /app

# Argumento para escolher o ambiente (ex: docker ou local)
ARG BUILD_ENV=docker

COPY package*.json ./
RUN npm install

COPY . .

# Gera a pasta 'dist/login-front' conforme seu angular.json
RUN npx ng build --configuration=$BUILD_ENV

# =========================
# Nginx (Servidor Estático)
# =========================
FROM nginx:alpine

# O PULO DO GATO: Copia sua config que tem o 'try_files' para matar o 404
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos compilados do estágio de build
COPY --from=build /app/dist/login-front /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
