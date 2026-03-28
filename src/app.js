import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './src/routes/auth.routes.js';
import taskRoutes from './src/routes/task.routes.js';
import errorHandler from './src/middleware/errorHandler.middleware.js';

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
