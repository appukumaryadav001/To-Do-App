import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import userRoutes from './routes/user.route.js';
import taskRoutes from './routes/task.route.js';
import errorHandler from './middlewares/errorHandler..middlewares.js';

const app = express();

app.use(express.json({
    limit:"10kb",
}));
app.use(express.urlencoded({extended:true, limit:"10kb"}));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Todo App API is running!' });
});

app.use(errorHandler);

export { app };
