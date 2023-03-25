import express from 'express';

const app = express();

const PORT = 3333;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => console.log('SERVER RUNNING 🔥'));

app.get('/', (req, res) => {
  return res.send('OK');
})