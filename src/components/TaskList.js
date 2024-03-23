// TaskList.js
import React from 'react';
import './style.css'; // Import CSS file for styling

const TaskList = ({ tasks, onUpdateStatus, onDeleteTask }) => {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <button onClick={() => onUpdateStatus(task._id)}>Update Status</button>
          <button onClick={() => onDeleteTask(task._id)}>Delete Task</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
