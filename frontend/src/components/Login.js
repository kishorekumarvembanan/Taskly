import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";  // Fix typo (import jwtDecode correctly)
import axios from 'axios';  // Import axios to send the request
import '../css/login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleSuccess = async (response) => {
    const decoded = jwtDecode(response.credential);
    console.log('Login Success:', decoded);

    try {
      // Send the user information to the backend
      await axios.post('http://localhost:5000/api/login', {
        googleId: decoded.sub, // Google ID from the decoded token
        name: decoded.name,
        email: decoded.email,
      });

      // After successful login and saving to the database, navigate to the home page
      navigate('/home', { state: { user: decoded } });
    } catch (error) {
      console.error('Error saving user to the database:', error);
    }
  };

  const handleError = (error) => {
    console.error('Login Failed:', error);
  };

  return (
    <div className="login-container">
      <h1>Create Your Daily Tasks with Taskly</h1>
      <p><b>Stay organized</b> and boost your <b>productivity</b> with our easy-to-use task manager.</p>
      <p>Sign in to get started and manage your tasks efficiently.</p>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        text="Sign in with Google"
        className="google-button"
      />
      <p className="footer-text">
        <i>"Success is the sum of small efforts, repeated day in and day out." – Robert Collier</i>
      </p>
    </div>
  );
};

export default Login;
