# Сборка React-приложения
FROM node:20-alpine AS build

WORKDIR /app

# Копируем файлы зависимостей
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install --legacy-peer-deps

# Копируем весь проект
COPY . .

# Собираем приложение для продакшн
RUN npm run build

# Запускаем с помощью serve
FROM node:20-alpine

WORKDIR /app

# Копируем собранные файлы из этапа сборки
COPY --from=build /app/build ./build

# Устанавливаем serve глобально
RUN npm install -g serve

# Экспонируем порт 4000
EXPOSE 4000

# Запускаем serve на порту 4000
CMD ["serve", "-s", "build", "-l", "4000"]