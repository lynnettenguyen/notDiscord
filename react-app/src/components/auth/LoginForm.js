import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
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
      setErrors(data);
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
      <div className='login-form'>
        <form onSubmit={onLogin}>
          <div className='form-header'>
            <h3>Welcome back!</h3>
            <div>We're so excited to see you again!</div>
          </div>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='form-section'>
            <label className='form-label' htmlFor='email'>Email</label>
            <input
              name='email'
              className='form-input'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='form-section'>
            <label className='form-label' htmlFor='password'>Password</label>
            <input
              name='password'
              className='form-input'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
            <div className='form-button-div'>
              <button className='form-button' type='submit'>Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
