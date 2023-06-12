import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './login';
import { Link, Route, Routes } from 'react-router-dom';
import debtlessLogo from '../assets/DEBTLESS.svg';
import bgPattern from '../assets/bg-pattern.svg';
import blurOne from '../assets/bg-blur-1.svg';
import blurTwo from '../assets/bg-blur-2.svg';

const Signup = () => {
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [monthlyIncomeInput, setMonthlyIncomeInput] = useState('');
  const [monthlyBudgetInput, setMonthlyBudgetInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  
  
  const navigate = useNavigate();
  
  const createNewUser = (event) => {
    event.preventDefault();
    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: firstNameInput,
        last_name: lastNameInput,
        description: descriptionInput,
        monthly_income: monthlyIncomeInput,
        monthly_budget: monthlyBudgetInput,
        email: emailInput,
        password: passInput,
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

  const handleFirstName = (e) => {
    setFirstNameInput(e.target.value);
  }

  const handleLastName = (e) => {
    setLastNameInput(e.target.value);
  }
  
  const handleDescription = (e) => {
    setDescriptionInput(e.target.value);
  }
  
  const handleMonthlyIncome = (e) => {
    setMonthlyIncomeInput(e.target.value);
  }
  
  const handleMonthlyBudget = (e) => {
    setMonthlyBudgetInput(e.target.value);
  }

  const handleEmail = (e) => {
    setEmailInput(e.target.value);
  }
 
  const handlePass = (e) => {
    setPassInput(e.target.value);
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
            <input type='text' id='firstName' onChange={handleFirstName} placeholder='First Name'></input>
            <input type='text' id='lastName' onChange={handleLastName} placeholder='Last Name'></input>
            <input type='text' id='description' onChange={handleDescription} placeholder='Description'></input>
            <input type='number' id='monthlyIncome' onChange={handleMonthlyIncome} placeholder='Monthly Income'></input>
            <input type='number' id='monthlyBudget' onChange={handleMonthlyBudget} placeholder='Monthly Budget'></input>
            <input type='text' id='semail' onChange={handleEmail} placeholder='Email'></input>
            <input type='password' id='spassword' onChange={handlePass} placeholder='Password'></input>
          <button type='submit' className="green-btn" onClick={createNewUser}>Create</button>
        </form>
      <div className='login-signup-div'>Have an account? <button id='loginRedirect' className='login-signup-btn' onClick={loginRedirect}>Login</button></div>
    </div>
  )
}

export default Signup;