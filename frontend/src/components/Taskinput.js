import React, { useState } from 'react';
import '../css/taskinput.css';
import { FaTrashAlt } from 'react-icons/fa';
import Modal from './Modal';


const TaskInput = ({ addTask }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && content) {
      await addTask({ title, content });
      setTitle('');
      setContent('');
      setIsVisible(false);
    }
  };

  return (
    <div className="task-input-container">
      <button className="add-task-button" onClick={() => setIsVisible(true)}>+ Add Task</button>
      
      <Modal isOpen={isVisible} onClose={() => setIsVisible(false)}>
        <form className="task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Task Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <div className="form-buttons">
            <button type="submit" className="submit-button">Add Task</button>
            <button type="button" className="cancel-button" onClick={() => setIsVisible(false)}>
              <FaTrashAlt /> 
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


export default TaskInput;
