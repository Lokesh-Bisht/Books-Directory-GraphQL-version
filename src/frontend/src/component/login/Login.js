import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { UserRegistrationForm } from '../register/UserRegistrationForm'
import Cookies from 'js-cookie'
import './Login.css'


export const Login = () => {

  const navigate = useNavigate();

  // Check if the user is already loggged in
  useEffect( () => {
    const accessToken = Cookies.get('Authorization');
    if (accessToken !== undefined) {
      navigate('/profile');
    } 
  })

  const api = axios.create({
    baseURL: 'http://localhost:8080/graphql',
    withCredentials: true,
  })


  // State to store login error messages
  const [loginError, setLoginError] = useState({
    msg: ''
  })

  // State to store login credentials provided by the user
  const [userLoginCredentials, setUserLoginCredentials] = useState({
    username: '',
    password: ''
  });


  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    // To get values for each input field in the form
    setUserLoginCredentials({ ...userLoginCredentials, [name] : value })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/', {
          query: `
            mutation login($user: loginCredentials) {
              login(user:$user) {
                success,
                status,
                user,
                msg,
                accessToken
              }
            }
            `,
            variables: {
              user: {
                username: userLoginCredentials.username,
                password: userLoginCredentials.password
              },
            },
               
      });

      if (response.data.data.login.success === true) {
        // redirect the user to the profile page.
        navigate(`/profile`);
      } else {
        setLoginError({ ...loginError, 
          msg: response.data.data.login.msg });
      }
    } catch(error) {
      setLoginError({ ...loginError, msg: 'Failed to login due to an error' });
    }
  }

  return (
    <div id="global-container">
    <div id="login-form-container">
      <form action=""> 
        <div id="login-header">Log in to Books Directory</div>
        <div id="username-container">
          <input type="text" value={userLoginCredentials.username}
          onChange={handleInput} size="30" name="username" 
          id="username-login" placeholder='Username or Email Address'/>
        </div>
        
        <div id="password-container">
          <input type="password" value={userLoginCredentials.password}
          onChange={handleInput} size="30"
          name="password" id="password-login" placeholder='Password'/>
        </div>
        
        <div id="login-button-container">
          <button id="login-button" type="submit"
          onClick={handleSubmit}>Login</button>
        </div>
      </form>
      <div id="login-error-container">
        <p id="login-error" 
          style={{
            padding: loginError.msg === '' ? '0' : '8px 0px 8px 0px'
          }}
        >
        {loginError.msg}
        </p>
      </div>
      <div id="sign-up-link-container">
        <Link to="/register" id="sign-up-link">Sign up</Link>
        <Routes>
          <Route path="/register" element={<UserRegistrationForm />} />
        </Routes>
      </div>
    </div>
    </div>
  )
}