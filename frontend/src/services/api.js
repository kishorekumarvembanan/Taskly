import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Change to your backend URL

export const getTasks = async () => {
  return await axios.get(`${API_URL}/tasks`);
};

export const createTask = async (taskData) => {
  return await axios.post(`${API_URL}/tasks`, taskData);
};

export const updateTask = async (id, updatedData) => {
  return await axios.put(`${API_URL}/tasks/${id}`, updatedData);
};

export const deleteTask = async (id) => {
  return await axios.delete(`${API_URL}/tasks/${id}`);
};
