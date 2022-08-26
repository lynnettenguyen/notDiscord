import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import "../CSS/SignUpForm.css"

const SignUpForm = () => {
  const blue = 'https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_blue.png'
  const green = 'https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_green.png'
  const lightblue = 'https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_light_blue.png'
  const darkpink = 'https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_dark_pink.png'
  const purple = 'https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_purple.png'
  const pink = 'https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_pink.png'
  const red = 'https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_red.png'
  const yellow = 'https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_yellow.png'
  const lightpurple = 'https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_light_purple.png'

  const userPfps = [blue, green, lightblue, darkpink, purple, pink, red, yellow, lightpurple]
  const randomPfp = userPfps[Math.floor(Math.random() * userPfps.length)];
  // console.log('randompfp', randomPfp)

  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  // const [profile_pic, setProfilePic] = useState(red)
  const [profile_pic, setProfilePic] = useState(randomPfp)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, profile_pic));
      if (data) {
        setErrors(data)
      }
    } else setErrors(['password: Password does not match'])
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateProfilePic = (e) => {
    console.log('etargetvalue', e.target.value)
    setProfilePic(e.target.value);
    console.log('profilepic', profile_pic)
  };

  if (user) {
    return <Redirect to='/servers' />;
  }

  return (
    <div className='main-form-outer'>
      <div className='outer-form'>
        <form onSubmit={onSignUp}>
          <div className='form-header'>
            Create an account
          </div>
          <div className='form-section'>
            <div className='form-label'>
              <label>EMAIL</label>
            </div>
            <input
              type='email'
              className='form-input'
              name='email'
              onChange={updateEmail}
              value={email}
              required
            />
          </div>
          <div className='form-section'>
            <div className='form-label'>
              <label>USERNAME</label>
            </div>
            <input
              type='text'
              className='form-input'
              name='username'
              onChange={updateUsername}
              value={username}
              required
            />
          </div>
          <div className='form-section'>
            <div className='form-label'>
              <label>PASSWORD</label>
            </div>
            <input
              type='password'
              className='form-input'
              name='password'
              onChange={updatePassword}
              value={password}
              required
            />
          </div>
          <div className='form-section'>
            <div className='form-label'>
              <label>REPEAT PASSWORD</label>
            </div>
            <input
              type='password'
              className='form-input'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            />
          </div>
          <div className='form-section'>
            <label>PROFILE PIC</label>
            <input
              type='text'
              className='form-input'
              name='profile_pic'
              onChange={updateProfilePic}
              value={profile_pic}
              required={true}
            />
            {/* <select value={profile_pic} onChange={(e) => setProfilePic(e.target.value)}>
                <option value={blue}>Blue</option>
                <option value={green}>Green</option>
                <option value={lightblue}>Light Blue</option>
                <option value={darkpink}>Dark Pink</option>
                <option value={purple}>Purple</option>
                <option value={pink}>Pink</option>
                <option value={red}>Red</option>
                <option value={yellow}>Yellow</option>
                <option value={"https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_light_purple.png'"}>Light Purple</option>
              </select> */}
          </div>
          <div className='signup-errors'>
            {errors.map((error, ind) => (
              <li className='signup-errors-inner' key={ind}>{error.split(":")[1]}</li>
              ))}
          </div>
          <div className='form-button-outer'>
            <button className='form-button' type='submit'>Continue</button>
          </div>
          <div className='redirect-login'>
            <NavLink id='navLink-login' to='/login'>Already have an account?</NavLink>
          </div>
          <div className='form-terms'>By registering, you agree to !Discord's Terms of Service and Privacy Policy.</div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
