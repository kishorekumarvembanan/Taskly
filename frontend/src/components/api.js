import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Ensure this is your backend URL

export const getTasks = async (userId) => {
  try {
    // Use the correct API URL and ensure userId is included
    const response = await getTasksByUser(userId);
    return response;
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    throw error; 
  }
};

export const createTask = async (taskData) => {
  try {
    // Use the full API URL
    const response = await axios.post(`${API_URL}/tasks`, taskData);
    return response;
  } catch (error) {
    console.error('Error creating task:', error.message);
    throw error; // Re-throw error to be caught in component
  }
};

export const getTasksByUser = async (userId) => {
  try {
    // Use the full API URL with userId
    const response = await axios.get(`${API_URL}/tasks/${userId}`);
    return response;
  } catch (error) {
    console.error('Error fetching tasks by user:', error.message);
    throw error; // Re-throw error to be caught in component
  }
};

export const updateTask = async (id, updatedData) => {
  try {
    // Use the full API URL with task ID
    const response = await axios.put(`${API_URL}/tasks/${id}`, updatedData);
    return response;
  } catch (error) {
    console.error('Error updating task:', error.message);
    throw error; // Re-throw error to be caught in component
  }
};

export const deleteTask = async (id) => {
  try {
    // Use the full API URL with task ID
    const response = await axios.delete(`${API_URL}/tasks/${id}`);
    return response;
  } catch (error) {
    console.error('Error deleting task:', error.message);
    throw error; // Re-throw error to be caught in component
  }
};
