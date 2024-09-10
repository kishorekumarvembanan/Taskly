import React from 'react';
import { FaTrashAlt } from 'react-icons/fa'; // Import bin icon
import '../css/tasklist.css';

const TaskList = ({ tasks, updateTask, deleteTask }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task._id} className="task-item">
          <h3>{task.title}</h3>
          <p>{task.content}</p>
          <div className="task-actions">
            <button
              className={`task-button ${task.isComplete ? 'completed' : 'incomplete'}`}
              onClick={() => updateTask(task._id)}
            >
              {task.isComplete ? 'Completed' : 'Incomplete'}
            </button>
            <button
              className="task-button delete"
              onClick={() => deleteTask(task._id)}
            >
              <FaTrashAlt /> {/* Bin icon */}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
