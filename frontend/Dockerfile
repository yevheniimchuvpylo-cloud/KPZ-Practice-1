FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Порт Vite за замовчуванням
EXPOSE 5173

# Запускаємо Vite з прапором --host, щоб він був доступний ззовні контейнера
CMD ["npm", "run", "dev", "--", "--host"]