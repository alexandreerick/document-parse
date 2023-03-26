import express from 'express';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(router);

const PORT = 3333;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => console.log('SERVER RUNNING 🔥'));