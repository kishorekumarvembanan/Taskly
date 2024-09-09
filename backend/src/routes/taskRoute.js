// src/routes/taskRoutes.js
const express = require('express');
const Task = require('../models/task');
const User = require('../models/user');

const router = express.Router();

// Create a new task associated with a user
router.post('/tasks', async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newTask = new Task({ title, content, user: userId });
    await newTask.save();

    user.tasks.push(newTask._id);
    await user.save();

    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tasks for a specific user
router.get('/tasks/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const tasks = await Task.find({ user: userId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
