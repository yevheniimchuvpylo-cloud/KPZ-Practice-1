require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

const Item = require('./models/Item');
const User = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());

// Використовуємо твій ключ, щоб не було конфліктів з .env
const JWT_SECRET = 'your_super_secret_key_123';

// ПІДКЛЮЧЕННЯ (твій робочий варіант - НЕ ЧІПАЄМО)
mongoose.connect(process.env.MONGO_URI, { family: 4 })
  .then(() => console.log('✅ Успішно підключено до MongoDB Atlas'))
  .catch(err => console.error('❌ Помилка підключення:', err));

// --- МІДЛВЕР ДЛЯ ПЕРЕВІРКИ ТОКЕНА ---
// Він потрібен, щоб знати, ХТО саме додає товар
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: "Немає токена" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id; // Запам'ятовуємо ID користувача
    next();
  } catch (e) {
    res.status(401).json({ message: "Токен невірний" });
  }
};

app.get('/', async (req, res) => {
  console.log('hello')

   const items = await User.findOne();
  res.json(items);
})

// --- РЕЄСТРАЦІЯ ТА ЛОГІН (твій код) ---
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Цей email вже є" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Успіх!" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Данні невірні" });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, userId: user._id, userName: user.name });
  } catch (err) { res.status(500).json({ message: "Помилка входу" }); }
});

// --- ТОВАРИ (додано прив'язку до автора) ---
app.get('/api/items', async (req, res) => {
  const items = await Item.find().sort({ date: -1 });
  res.json(items);
});

// Додаємо auth, щоб знати автора товару
app.post('/api/items', auth, async (req, res) => {
  try {
    const newItem = new Item({
      ...req.body,
      author: req.userId // Тепер ми точно знаємо, хто створив запис
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) { res.status(400).json({ message: "Помилка додавання" }); }
});

// Кабінет користувача
app.get('/api/my-items/:userId', async (req, res) => {
  const items = await Item.find({ author: req.params.userId });
  res.json(items);
});

const PORT = 5555;
app.listen(PORT, () => console.log(`🚀 Сервер на http://localhost:${PORT}`));


