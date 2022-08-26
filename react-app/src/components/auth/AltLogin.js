import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import { getUsers } from '../../store/users';
import "../CSS/AltLogin.css"

const AltLogin = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [goodEmail, setGoodEmail] = useState(false)
  const user = useSelector(state => state.session.user);
  const users = useSelector(state => Object.values(state.users))
  const dispatch = useDispatch();
  const history = useHistory()

    useEffect(()=>{
        dispatch(getUsers())
    }, [])


  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password))
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    })
    if (data) {
      setErrors(['Email and/or password could not be validated'])
    } else {
      history.push('/servers')
    }
  };

  const onUser = async (e) => {
    e.preventDefault();
    let go = true
    let check
    if (email === 'demo' || email === 'demo@aa.io') {
        go = false
        setEmail('')
        dispatch(login('demo@aa.io', 'password'))
        .then(()=>history.push('/servers'))
    }
    if (go) {
        users.forEach(user => {
            if (user.email === email) {
                check = true
            }
        })
        if (!check) {
            setErrors(['Email does not exist'])
        } else {
            setErrors([])
            setGoodEmail(true)
        }
    }
  };

  const updateEmail = (e) => {
    setErrors([])
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setErrors([])
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
<>
      {!goodEmail && (<div className='outer-alt-login'>
        <form onSubmit={onUser}>
          <div className='alt-form-section'>
            <div className='alt-form-label'>
          <div className='alt-login-errors'>
            {errors.map((error, ind) => (
                <div className='alt-email-errors-inner' key={ind}>{error}</div>
                ))}
          </div>
            </div>
            <input
              name='email'
              placeholder='Login with your Email...                 or type "demo"'
              className='alt-form-input'
              type='text'
              value={email}
              onChange={updateEmail}
              required
              />
              <button className='alt-form-button-email' type='submit'><i className="fas fa-arrow-right"/></button>
          </div>
        </form>
      </div>)}



        {goodEmail && (<div className='outer-alt-login'>
        <form onSubmit={onLogin}>
          <div className='alt-form-section'>
            <div className='alt-form-label'>
          <div className='alt-login-errors'>
            {errors.map((error, ind) => (
                <div className='alt-login-errors-inner' key={ind}>{error}</div>
                ))}
          </div>
            </div>
            <input
                  name='password'
                  className='alt-form-input'
                  placeholder='Enter your Password'
                  type='password'
                  value={password}
                  onChange={updatePassword}
                  required
                />
              <button className='alt-form-button-login' type='submit'><i className="fas fa-arrow-right"/></button>
          </div>
        </form>
      </div>)}
    </>
  );
};

export default AltLogin;
