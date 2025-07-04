import express from 'express';
import {connectDB} from './lib/db.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
  connectDB();
});

export default app;