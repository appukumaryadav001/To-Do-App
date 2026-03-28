import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/user.route.js';
import taskRoutes from './routes/task.route.js';
import errorHandler from './middlewares/errorHandler..middlewares.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Todo App API is running!' });
});

app.use(errorHandler);

export { app };
