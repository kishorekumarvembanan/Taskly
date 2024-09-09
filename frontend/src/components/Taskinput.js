import React, { useState } from 'react';
import '../css/taskinput.css';

const TaskInput = ({ addTask }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [context, setContext] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && context) {
      await addTask({ title, context });
      setTitle('');
      setContext('');
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
            placeholder="Task Context"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            required
          />
          <button type="submit">Add Task</button>
          <button type="button" onClick={() => setIsVisible(false)}>Cancel</button>
        </form>
      ) : (
        <button className="add-task-button" onClick={() => setIsVisible(true)}>
          +
        </button>
      )}
    </div>
  );
};

export default TaskInput;
