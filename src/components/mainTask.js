import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Typography,} from '@mui/material';
import { styled } from '@mui/system';

import TaskForm from './TaskForm';
import TaskList from './TaskList';
import FilterDropdown from './FilterDropdown';
import LogoutButton from './logout';




const FormContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(3),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
  background: 'linear-gradient(to bottom, #333333, #000000), radial-gradient(circle, #222222 1px, transparent 1px), radial-gradient(circle, #222222 1px, transparent 1px)',
  backgroundSize: '100px 100px, 50px 50px, 50px 50px',
  backgroundPosition: '0 0, 25px 25px, 0 0, 25px 25px',
}));

const MainTask = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statuses, setStatuses] = useState(['To Do', 'In Progress', 'Done']);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [Name, setName] = useState('')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login'); // Redirect to login page if user information not found
    } else {
    setName(user.data.name)
      fetchTasks();
    }
  }, [navigate]);

  const fetchTasks = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'))
        const uid = user.data.uid
      const response = await axios.get(`http://localhost:5000/api/task/${uid}`);
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
    <div style={{ backgroundColor: '#282828', height:'100%' }}>
      <FormContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%',}}>
        <Typography variant="h5" component="h2" sx={{marginBottom:'20px', color:'#ffff'}} gutterBottom>Task Manager</Typography>
        <Typography sx={{marginBottom:'20px', color:'#ffff', fontSize:'20px'}}> Welcome - {Name}</Typography>
        <LogoutButton sx={{marginBottom:'30px'}}/>
        </div>
        <TaskForm onTaskCreated={handleTaskCreated} />
        <FilterDropdown statuses={['All', ...statuses]} onSelectStatus={handleSelectStatus} />
        <TaskList tasks={filteredTasks} onUpdateStatus={handleUpdateStatus} onDeleteTask={handleDeleteTask} />
      </FormContainer>
    </div>
  );
};

export default MainTask;
