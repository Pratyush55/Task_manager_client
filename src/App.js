// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterDropdown from './components/FilterDropdown';
import './App.css';
// import SignupForm from './components/signup';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statuses, setStatuses] = useState(['To Do', 'In Progress', 'Done']);
  const [selectedStatus, setSelectedStatus] = useState('All');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/task');
      setTasks(response.data);
      setFilteredTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
    setFilteredTasks([...tasks, newTask]);
  };

  const handleUpdateStatus = async (taskId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/task/${taskId}`, { status: 'Done' });
      const updatedTask = response.data;
      const updatedTasks = tasks.map(task =>
        task._id === updatedTask._id ? updatedTask : task
      );
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/task/${taskId}`);
      const updatedTasks = tasks.filter(task => task._id !== taskId);
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleSelectStatus = (status) => {
    setSelectedStatus(status);
    if (status === 'All') {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter(task => task.status === status);
      setFilteredTasks(filtered);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Task Manager</h1>
      <TaskForm onTaskCreated={handleTaskCreated} />
      <FilterDropdown statuses={['All', ...statuses]} onSelectStatus={handleSelectStatus} />
      <TaskList tasks={filteredTasks} onUpdateStatus={handleUpdateStatus} onDeleteTask={handleDeleteTask} />
    </div>
  );
};

export default App;
