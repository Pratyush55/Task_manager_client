import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainTask from './components/mainTask';
import AuthForm from './components/AuthForm';


function App() {
  return (
    <Router>
      <Routes>
    <Route path="/" element={<AuthForm />} />
    <Route path="/login" element={<AuthForm />} />
    <Route path="/task" element={<MainTask/>} />
    </Routes>
    </Router>
  );
}

export default App;
