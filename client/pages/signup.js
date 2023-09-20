import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './login';
import { Link, Route, Routes } from 'react-router-dom';
import debtlessLogo from '../assets/DEBTLESS.svg';
import bgPattern from '../assets/bg-pattern.svg';
import blurOne from '../assets/bg-blur-1.svg';
import blurTwo from '../assets/bg-blur-2.svg';

const Signup = () => {
  const [signupForm, setSignupForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    description: '',
    monthlyIncome: 0,
    monthlyBudget: 0,
  })
  
  
  const navigate = useNavigate();
  
  const createNewUser = (event) => {
    event.preventDefault();
    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: signupForm.firstName,
        last_name: signupForm.lastName,
        description: signupForm.description,
        monthly_income: signupForm.monthlyIncome,
        monthly_budget: signupForm.monthlyBudget,
        email: signupForm.email,
        password: signupForm.password
      })
    })
    .then(data => data.json())
    .then(response => console.log(response.message))
    .catch(err => {
      console.log('creatNewUserError', err);
    })

    navigate('/login', {replace: true});
  }
  
  const loginRedirect = () => {
    navigate('/login', {replace: true});
  }

  const handleInput = (e) => {
    setSignup((prev) => ({...prev, [e.target.id]: e.target.value}))
  }
  
  return (
    <div className='form-wrapper'>
      <img src={bgPattern} className='bg-pattern' />
      <h1 className='title'>Welcome to</h1>
      <img src={debtlessLogo} className='logoName' />
      <img src={blurOne} className='blur-one' />
      <img src={blurTwo} className='blur-two' />
      <h4 id='createAccount' className='sub-title'>Create your account</h4>
        <form className='form-div' >
            <input type='text' id='firstName' onChange={handleInput} placeholder='First Name'></input>
            <input type='text' id='lastName' onChange={handleInput} placeholder='Last Name'></input>
            <input type='text' id='description' onChange={handleInput} placeholder='Description'></input>
            <input type='number' id='monthlyIncome' onChange={handleInput} placeholder='Monthly Income'></input>
            <input type='number' id='monthlyBudget' onChange={handleInput} placeholder='Monthly Budget'></input>
            <input type='text' id='email' onChange={handleInput} placeholder='Email'></input>
            <input type='password' id='password' onChange={handleInput} placeholder='Password'></input>
          <button type='submit' className="green-btn" onClick={createNewUser}>Create</button>
        </form>
      <div className='login-signup-div'>Have an account? <button id='loginRedirect' className='login-signup-btn' onClick={loginRedirect}>Login</button></div>
    </div>
  )
}

export default Signup;