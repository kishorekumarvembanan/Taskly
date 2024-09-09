import React from 'react';
import '../css/tasklist.css'; // Ensure your CSS file is included

const TaskList = ({ tasks, updateTask, deleteTask }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task._id} className="task-item">
          <h3>{task.title}</h3>
          <p>{task.content}</p> {/* Make sure to use `task.content` to display the content */}
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
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
