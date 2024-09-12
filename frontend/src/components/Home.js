import React, { useState, useEffect } from 'react';
import TaskInput from './Taskinput';
import TaskList from './Tasklist';
import { useLocation, useNavigate } from 'react-router-dom';
import { getTasks, createTask, updateTask, deleteTask } from './api';
import '../css/home.css';
import profilepic from '../assets/profile.png';
import quotes from './quote'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;
  const [tasks, setTasks] = useState([]);
  const [quote, setQuote] = useState('');
  const [date, setDate] = useState(new Date());


  console.log('User in Home:', user);

  useEffect(() => {
    console.log('User:', user); 
    if (user) {
      setQuote(getRandomQuote());
      fetchTasks();
    }
  }, [user,navigate]); 

  const fetchTasks = async () => {
    try {
      console.log('Fetching tasks for user ID:', user._id);
      if (user._id) {
        const response = await getTasks(user._id);
        setTasks(response.data);
      } else {
        console.error('User ID is missing.');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };
  
  const handleAddTask = async (task) => {
    try {
      if (!user?._id) {
        throw new Error('User ID is missing.');
      }
  
      const taskData = {
        title: task.title,
        content: task.content,
        userId: user._id 
      };
  
      console.log('Task Data:', taskData); 
  
      const response = await createTask(taskData);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error.message);
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

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  const onDateChange = (newDate) => {
    setDate(newDate);
  };


  return (
    <div className="home-container">
      <aside className="sidebar">
        <img 
          src= {user?.picture || profilepic}
          alt="User profile" 
          className="user-image" 
        />

        <h2 className="user-name">{user?.name}</h2>

        <div className="quote-section">
          <p>{quote}</p>
        </div>

        <div className="calendar-section">
          <Calendar
            onChange={onDateChange}
            value={date}
          />
        </div>

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
