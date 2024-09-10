import React, { useState } from 'react';
import '../css/taskinput.css';

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
      {isVisible ? (
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
          <button type="submit">Add Task</button>
          <button type="button" onClick={() => setIsVisible(false)}>Cancel</button>
        </form>
      ) : (
        <button className="add-task-button" onClick={() => setIsVisible(true)}>+</button>
      )}
    </div>
  );
};


export default TaskInput;
