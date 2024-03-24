import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AuthForm.css'


const AuthForm = ({ }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [displayName, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isSignup, setIsSignup] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isSignup) {

                const response = await axios.post('http://localhost:5000/api/auth/signup', { email, password, displayName });

                if (response.status === 201) {
                    toast.success('Sign up successful! Please Login to proceed');
                }
            } else {

                const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

                if (response.status === 200) {
                    localStorage.setItem("user", JSON.stringify(response))
                    navigate('/task');
                }
            }
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Authentication error:', error);

        }
    };

    return (
        <div className="auth-container">
            <ToastContainer />
            <h1>TASK MANAGER</h1>
            <h2>{isSignup ? 'Sign Up' : 'Log In'}</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                {isSignup && (
                    <input type="text" placeholder="Display Name" value={displayName} onChange={(e) => setName(e.target.value)} required />
                )}
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">{isSignup ? 'Sign Up' : 'Log In'}</button>
            </form>
            <p>{isSignup ? 'Already have an account?' : 'Don\'t have an account?'} <button onClick={() => setIsSignup(!isSignup)}>{isSignup ? 'Log In' : 'Sign Up'}</button></p>
        </div>
    );
};

export default AuthForm;