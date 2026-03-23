require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose'); 
const Item = require('./Item');

const app = express();
const PORT = 5555;

// Мідлвер для JSON
app.use(express.json());

// ПІДКЛЮЧЕННЯ ДО MONGODB (Тільки один раз!)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Успішно підключено до MongoDB Atlas'))
  .catch(err => console.error('❌ Помилка підключення:', err));

// Головна сторінка
app.get('/', (req, res) => {
  res.send('Бюро знахідок: Бекенд працює і база підключена!');
});

// ЗАПУСК СЕРВЕРА (Тільки один раз у самому кінці!)
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущено на http://localhost:${PORT}`);
});