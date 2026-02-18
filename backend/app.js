const express = require('express');
const path = require('path');
const app = express();
const port = 3111;

app.use(express.json());

const frontendPath = path.join(__dirname, '..', 'frontend');

app.use(express.static(frontendPath));

let squares = [
   { color: 'primary', size: '100' },
   { color: 'success', size: '75' },
   { color: 'danger', size: '50' }
];

app.get('/', (req, res) => {
   res.sendFile(path.join(frontendPath, 'index.html'));
});

app.get('/api/squares', (req, res) => {
   res.json(squares);
});

app.post('/api/squares', (req, res) => {
   squares = req.body;
   console.log('Дані оновлено:', squares);
   res.json({ message: 'Сервер отримав дані та оновив верстку!' });
});

app.listen(port, () => {
   console.log(`Приклад додатка слухає на порту ${port}!`);
   console.log(`Відкрийте: http://localhost:${port}`);
});