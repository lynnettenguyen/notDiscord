import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import "../CSS/SignUpForm.css"
import "../CSS/LoginForm.css"

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      // setErrors(data);
      setErrors(['Email and/or password could not be validated'])
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='main-form-outer'>
      <div className='outer-form-login'>
        <form onSubmit={onLogin}>
          <div className='form-header'>
            Welcome back!
          </div>
          <div className='login-caption'>We're so excited to see you again!</div>
          <div className='form-section'>
            <div className='form-label'>
              <label htmlFor='email'>EMAIL</label>
            </div>
            <input
              name='email'
              className='form-input'
              type='email'
              value={email}
              onChange={updateEmail}
              required
            />
          </div>
          <div className='form-section'>
            <div className='form-label'>
              <label htmlFor='password'>PASSWORD</label>
            </div>
            <input
              name='password'
              className='form-input'
              type='password'
              value={password}
              onChange={updatePassword}
              required
            />
          </div>
          <div className='login-errors'>
            {errors.map((error, ind) => (
              <li className='login-errors-inner' key={ind}>{error}</li>
            ))}
          </div>
          <div className='form-button-outer'>
            <button className='form-button-login' type='submit'>Log In</button>
          </div>
          <div className='redirect-register'>
            <span className='redirect-span'>Need an Account?</span>
            <NavLink id='navLink-login' to='/register'>Register</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
