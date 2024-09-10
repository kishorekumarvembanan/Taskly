const express = require('express');
const Task = require('../models/task');
const User = require('../models/user'); // Make sure you import the User model

const router = express.Router();

router.post('/tasks', async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const newTask = new Task({ title, content, user: userId });
    await newTask.save();

    const user = await User.findById(userId);
    if (user) {
      user.tasks.push(newTask._id);
      await user.save();
    }

    res.status(201).json(newTask);
  } catch (err) {
    console.error('Backend error:', err.message); // Log the error
    res.status(500).json({ error: err.message });
  }
});


// Get all tasks for a specific user
router.get('/tasks/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await User.findById(userId).populate('tasks');
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json(user.tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err.message);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});


// Update task status (toggle isComplete)
router.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    task.isComplete = !task.isComplete;
    await task.save();
    res.status(200).json(task);
  } catch (err) {
    console.error('Error updating task:', err.message);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete a task and remove reference from the user
router.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    // Remove the task reference from the associated user
    await User.findByIdAndUpdate(task.user, { $pull: { tasks: id } });

    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    console.error('Error deleting task:', err.message);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});


module.exports = router;
