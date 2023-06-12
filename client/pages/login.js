import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import bgPattern from '../assets/bg-pattern.svg';
import blurOne from '../assets/bg-blur-1.svg';
import blurThree from '../assets/bg-blur-3.svg';

const Login = () => {
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const navigate = useNavigate();

  const loginUser = (event) => {
    event.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailInput,
        password: passInput,
      })
    })
    .then(data => data.json())
    .then(response => {
      console.log('response', response);
      if(response.message !== 'Login successful') {
        window.alert('Incorrect username or password');
      } else {
        navigate('/dashboard', {replace: true});
      }
    })
    .catch(err => {
      console.log('loginUserError', err);
    })
  }
  
  const signUpRedirect = () => {
    navigate('/');
  }
  
  const handleEmailInput = (e) => {
    setEmailInput(e.target.value);
  }
 
  const handlePassInput = (e) => {
    setPassInput(e.target.value);
  }
  return (
    <div id='form-wrapper' className="form-wrapper">
            <img src={bgPattern} className='bg-pattern' />
            <img src={blurOne} className='blur-one' />
            <img src={blurThree} className='blur-three' />
    <h4 id='title' className="sub-title">Login</h4>
      <form id='loginForm' className="form-div">
        {/* <label htmlFor='lemail'>Email: </label> */}
        <input type='text' id='lemail' onChange={handleEmailInput} placeholder='Email'></input> <br></br>
        {/* <label htmlFor='lpassword'>Password: </label> */}
        <input type='password' id='lpassword' onChange={handlePassInput} placeholder='Password'></input><br></br>
        <button type='submit' id='loginBtn' className="green-btn" onClick={loginUser}>Login</button>
      </form>
      <div className='login-signup-div' >Need an account?<button id='resignup' className='login-signup-btn' onClick={signUpRedirect}>Signup</button></div>
    </div>

  )
}

export default Login;