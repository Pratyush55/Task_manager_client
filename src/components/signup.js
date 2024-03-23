// // SignupForm.js
// import React, { useState } from 'react';
// import axios from 'axios';

// const SignupForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/', { email, password });
//       // Handle successful signup, e.g., redirect to dashboard
//     } catch (error) {
//       console.error('Error signing up:', error);
//       // Handle signup error, e.g., display error message
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
//       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
//       <button type="submit">Signup</button>
//     </form>
//   );
// };

// export default SignupForm;
