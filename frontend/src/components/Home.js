import React, { useState, useEffect } from 'react';
import TaskInput from './Taskinput';
import TaskList from './Tasklist';
import { useLocation, useNavigate } from 'react-router-dom';
import { getTasks, createTask, updateTask, deleteTask } from './api';
import '../css/home.css';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async (task) => {
    try {
      const response = await createTask(task);
      console.log('Task added:', response.data); // Log task data
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error.response ? error.response.data : error.message);
    }
  };
  
  

  const handleUpdateTask = async (id, updatedData) => {
    try {
      const response = await updateTask(id, updatedData);
      setTasks(tasks.map(task => (task._id === id ? response.data : task)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleSignOut = () => {
    navigate('/');
  };

  return (
    <div className="home-container">
      <aside className="sidebar">
        <img src={user?.picture} alt="User profile" className="user-image" />
        <h2 className="user-name">{user?.name}</h2>
        <button className="sign-out-button" onClick={handleSignOut}>
          Sign Out
        </button>
      </aside>

      <section className="main-content">
        <h1>Welcome to Taskly</h1>
        <TaskInput addTask={handleAddTask} />
        <TaskList tasks={tasks} updateTask={handleUpdateTask} deleteTask={handleDeleteTask} />
      </section>
    </div>
  );
};

export default Home;
