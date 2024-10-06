import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Logic for sending login request to backend
    const res = await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      // Handle login success
      const result = jwtDecode(data.token)
      localStorage.setItem("id", result.id)
      localStorage.setItem("email", result.email)
      navigate('/')
    } else {
      // Handle login failure
      alert('Login failed, please check your credentials');
    }
  };

return (
    <div className="container">
      <div className="login-form">
        <div className="login-form-fields">
          <div className="login-input-group">
            <div className="name-password-login-button">
              {/* User Icon */}
              <div className="user-icon">
                <img 
                  src="https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" 
                  alt="User Photo" 
                />
              </div>
              <form onSubmit={handleLogin}>
                {/* Email Field */}
                <div className="name">
                  <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>

                {/* Password Field */}
                <div className="password">
                  <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </div>

                {/* Login Button */}
                <div className="login-btn">
                  <button type="submit">Log In</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;