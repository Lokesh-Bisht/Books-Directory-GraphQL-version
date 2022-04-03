import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import './UserRegistrationForm.css'


export const UserRegistrationForm = () => {

  const navigate = useNavigate();

  // Check if the user is already loggged in
  useEffect( () => {
    const accessToken = Cookies.get('Authorization');
    if (accessToken !== undefined) {
      navigate('/profile');
    } 
  })

  const api = axios.create({
    baseURL: 'http://localhost:8080/graphql/',
    withCredentials: true,
  })

  // State to store user registration error messages
  const [registerError, setRegisterError] = useState({
    msg: ''
  })

  // State to store register data provided by the user
  const [userRegistration, setUserRegistration] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    // To get values for each input field in the form
    setUserRegistration({ ...userRegistration, [name] : value })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();   // to prevent page refresh

    try {
      const user = {
        username: userRegistration.username,
        email: userRegistration.email,
        password: userRegistration.password
      }
      const response = await api.post('/', {
          query: `
            mutation registerUser($user: User) {
              registerUser(user:$user) {
                success,
                status,
                user,
                msg,
                accessToken
              }
            }
            `,
            variables: {
              user: user,
            },
      });
      
      const { success, msg } = response.data.data.registerUser;
      if (success === true) {
        console.log('User registered successfully.');
        navigate(`/profile`);
      } else {
        setRegisterError({ ...registerError, success: success, msg: msg });
      }

    } catch(error) {
      setRegisterError({ 
        ...registerError, 
        success: false,
        msg: "An error occurred while trying to register the user. Please, try again." 
      });
    }
  }

  return (
    <div id="global-container">
      <div id="register-form-container">
        <form action="" id="register-form"> 
          <div id="register-header">Create an account</div>
            <div id="username-container">
              <input type="text" placeholder="Email Address" size="50"
              value={userRegistration.username} 
              onChange={handleInput} 
              name="username" id="username" />
            </div>
            <div>
              <input type="email" placeholder="Email Address" size="50"
              value={userRegistration.email} 
              onChange={handleInput} 
              name="email" id="email" />
            </div>
            <div id="password-container">
              <input type="password" placeholder="Password" size="50"
              value={userRegistration.password} 
              onChange={handleInput} 
              name="password" id="password" />
            </div>
        </form>
        <div id="register-button-container">
          <button type="submit" id="register-button"
          onClick={handleSubmit}>Register</button>
        </div>
        <div id="register-error-container">
          <p id="register-error" 
            style={{
              backgroundColor: userRegistration.success === true ? 
              'green' : 'red',
              padding: registerError.msg === '' ? '0' : '8px 0px 8px 0px'
            }}
          >
          {registerError.msg}
          </p>
        </div>
        <div id="login-link-container">
          <Link to="/" id="login-link">Login</Link>
          <Routes>
            <Route path="/"  />
          </Routes>
        </div>
      </div>
    </div>
  )
}