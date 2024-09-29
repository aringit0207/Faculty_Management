import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');  // To display success or error messages
  const navigate = useNavigate()

  useEffect(() => {
     const email = localStorage.getItem("email");
     if(email !== "vandantiwari@gmail.com") {
      alert("Not allowed to Access this Page")
      navigate('/')
     }
  },[])
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessage('Registration successful!');
        // Redirect or update UI after successful registration
      } else {
        const errorData = await res.json();
        setMessage(`Registration failed: ${errorData.message}`);
      }
    } catch (err) {
      setMessage('An error occurred during registration. Please try again.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name}
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}  {/* Display success or error message */}
    </div>
  );
};

export default Register;