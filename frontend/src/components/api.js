import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Change to your backend URL

export const getTasks = async () => {
  return await axios.get(`${API_URL}/tasks`);
};


export const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, taskData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Task created:', response.data); // Log response data
    return response;
  } catch (error) {
    console.error('Error adding task:', error.response ? error.response.data : error.message); // Log detailed error
    throw error;
  }
};


export const updateTask = async (id, updatedData) => {
  return await axios.put(`${API_URL}/tasks/${id}`, updatedData);
};

export const deleteTask = async (id) => {
  return await axios.delete(`${API_URL}/tasks/${id}`);
};



