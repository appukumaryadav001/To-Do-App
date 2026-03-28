import Task from '../models/task.model.js';
import asyncHandler from '../utils/asyncHandler.utils.js';
import ApiError from '../utils/apiError.utils.js';


const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || title.trim() === '') {
    throw new ApiError(400, 'Title is required');
  }

  const task = await Task.create({
    title,
    description,
    user: req.user._id, 
  });

  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: task,
  });
});


const getAllTasks = asyncHandler(async (req, res) => {
  
  const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
});


const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

 
  if (task.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'Not authorized to access this task');
  }

  res.status(200).json({
    success: true,
    data: task,
  });
});


const updateTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (title !== undefined && title.trim() === '') {
    throw new ApiError(400, 'Title cannot be empty');
  }

  let task = await Task.findById(req.params.id);

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  if (task.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'Not authorized to update this task');
  }

  task = await Task.findByIdAndUpdate(
    req.params.id,
    { title, description },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: 'Task updated successfully',
    data: task,
  });
});


const markComplete = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  if (task.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'Not authorized to update this task');
  }

 
  if (task.isCompleted) {
    throw new ApiError(400, 'Task is already marked as completed');
  }

  task.isCompleted = true;
  await task.save();

  res.status(200).json({
    success: true,
    message: 'Task marked as completed',
    data: task,
  });
});


const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }


  if (task.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'Not authorized to delete this task');
  }

  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Task deleted successfully',
  });
});

export { createTask, getAllTasks, getTaskById, updateTask, markComplete, deleteTask };