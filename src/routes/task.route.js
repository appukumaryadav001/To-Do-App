import express from 'express';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  markComplete,
  deleteTask,
} from '../controllers/task.controller.js';
import protect from '../middleware/auth.middleware.js';

const router = express.Router();

// Saare task routes protected hain — token zaroori hai
router.use(protect);

router.post('/', createTask);
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.patch('/:id/complete', markComplete);
router.delete('/:id', deleteTask);

export default router;
