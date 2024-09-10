// src/routes/taskRoutes.js

const express = require('express');
const Task = require('../models/task');

const router = express.Router();

// Create a new task
router.post('/tasks', async (req, res) => {
  console.log('Received task data:', req.body); // Log received data
  try {
    const { title, content } = req.body;
    const newTask = new Task({ title, content });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error('Error saving task:', err); // Log errors
    res.status(500).json({ error: err.message });
  }
});



// Get all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update task status
router.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    task.isComplete = !task.isComplete;
    await task.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a task
router.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
