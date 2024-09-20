import React, { useState } from 'react';
import './Login.css';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [loggedIn, setLoggedIn] = useState(false);

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5001/login', data)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        setLoggedIn(true);   
      })
      .catch((err) => {
        console.error('Login error:', err.response ? err.response.data : err.message);
        alert(err.response ? err.response.data : 'An error occurred. Please try again.');
      });
  };

  if (loggedIn || localStorage.getItem('token')) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <div>
      <nav className='navbar bg-dark'>
        <h1>
          <Link to='/'><i className='fas fa-code'></i>Developer Hub</Link>
        </h1>
        <ul className='nav-links'>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
      <div className='Log-body'>
        <section className='container1'>
          <h1 className='large text-primary'>Sign-In</h1>
          <p className='lead'><i className='fas fa-user'>Sign into your account</i></p>
          <form className='form' onSubmit={submitHandler} autoComplete='off'>
            <div className='form-group'>
              <input type='email' placeholder='Email Address' onChange={changeHandler} name='email' required />
            </div>
            <div className='form-group'>
              <input type='password' placeholder='Password' onChange={changeHandler} name='password' required />
            </div>
            <input type='submit' className='btn btn-primary' />
          </form>
          <p className='my-1'>
            Don't have an Account? <Link to='/register'>Sign Up</Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Login;
