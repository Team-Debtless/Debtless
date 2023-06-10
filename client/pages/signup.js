import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './login';
import { Link, Route, Routes } from 'react-router-dom';

const Signup = () => {
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  
  const navigate = useNavigate();
  
  const createNewUser = () => {
    // console.log('create works');
    // console.log('emailInput', emailInput);
    // console.log('passInput', passInput);
    // fetch('/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: {
    //     email: emailInput,
    //     password: passInput
    //   }
    // })
    // .then(data => data.json())
    // .catch(err => {
    //   console.log('creatNewUserError', err);
    // })

    navigate('/login');
  }
  
  const loginRedirect = () => {
    navigate('/login');
  }

  const handleEmailInput = (e) => {
    setEmailInput(e.target.value);
  }
 
  const handlePassInput = (e) => {
    setPassInput(e.target.value);
  }
  
  return (
    <>
      <h1>Sign up for Debtless</h1>
      <form onSubmit={createNewUser}>
          <div className='signUpForm'>
            <label htmlFor='semail'>Email: </label>
            <input type='text' id='semail' onChange={handleEmailInput} placeholder='Enter Email'></input> <br></br>
            <label htmlFor='spassword'>Password: </label>
            <input type='text' id='spassword' onChange={handlePassInput} placeholder='Enter Password'></input><br></br>
            <button type='submit'>Create</button>
          </div>
      </form>
      <div>Click here to <button id='loginRedirect' onClick={loginRedirect}><u>Login</u></button></div>
    </>
  )
}

export default Signup;