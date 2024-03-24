// TaskList.js
import React from 'react';
import './style.css'; // Import CSS file for styling

const TaskList = ({ tasks, onUpdateStatus, onDeleteTask }) => {

const [selectedStatus, setSelectedStatus] = React.useState('');

  const handleStatusChange = (taskId, status) => {
    setSelectedStatus(status);
  };

  const handleUpdateTaskStatus = (taskId) => {
    if (selectedStatus) {
      onUpdateStatus(taskId, selectedStatus);
      setSelectedStatus(''); // Reset selected status after update
    } else {
      // Notify user to select a status
      alert('Please select a status before updating.');
    }
  };
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <div style={{marginRight:'20px', marginBottom:'20px'}}>
          <select value={selectedStatus} onChange={(e) => handleStatusChange(task._id, e.target.value)}>
            <option value="">Select Status</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          </div>
          <button onClick={() => handleUpdateTaskStatus(task._id)}>Update Status</button>
          <button onClick={() => onDeleteTask(task._id)}>Delete Task</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
