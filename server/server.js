import express from 'express';
import cors from 'cors';
import authRouter from './router/auth.router.js';
import errorHandler from './middleware/errorMiddleware.js';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', authRouter);
app.use(errorHandler)

app.listen(5000, () => {
  console.log('Successfully started server on port 5000');
});
