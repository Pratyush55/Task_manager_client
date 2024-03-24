import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('user');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <Button color="inherit" onClick={handleLogout} sx={{color:'#ffff', border: '1px solid #ffffff', marginBottom:'20px'}}>
      Logout
    </Button>
  );
};

export default LogoutButton;
