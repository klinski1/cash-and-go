# Сборка React-приложения
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Запускаем с помощью serve
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/build ./build
RUN npm install -g serve
EXPOSE 4000  
CMD ["serve", "-s", "build", "-l", "4000"]  # Изменили порт на 4000