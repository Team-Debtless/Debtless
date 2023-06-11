import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './login';
import { Link, Route, Routes } from 'react-router-dom';

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
    <>
      <h1 className='signUpTitle'>Welcome to</h1>
      <p id='logoName'>Debtless</p>
      <h4 id='createAccount'>Create your account</h4>
      <div className='signUpForm'>
        <form>
          <div>
            {/* <label htmlFor='firstName'>First Name: </label> */}
            <input type='text' id='firstName' onChange={handleFirstName} placeholder='First Name'></input>
          </div>
          <div>
            {/* <label htmlFor='lastName'>Last Name: </label> */}
            <input type='text' id='lastName' onChange={handleLastName} placeholder='Last Name'></input>
          </div>
          <div>
            {/* <label htmlFor='description'>Description: </label> */}
            <input type='text' id='description' onChange={handleDescription} placeholder='Description'></input>
          </div>
          <div>
            {/* <label htmlFor='monthlyIncome'>Monthly Income: </label> */}
            <input type='number' id='monthlyIncome' onChange={handleMonthlyIncome} placeholder='Monthly Income'></input>
          </div>
          <div>
            {/* <label htmlFor='monthlyBudget'>Monthly Budget: </label> */}
            <input type='number' id='monthlyBudget' onChange={handleMonthlyBudget} placeholder='Monthly Budget'></input>
          </div>
          <div>
            {/* <label htmlFor='email'>Email: </label> */}
            <input type='text' id='semail' onChange={handleEmail} placeholder='Email'></input>
          </div>
          <div>
            {/* <label htmlFor='spassword'>Password: </label> */}
            <input type='password' id='spassword' onChange={handlePass} placeholder='Password'></input>
          </div>
          <button type='submit' onClick={createNewUser}>Create</button>
        </form>
      </div>
      <div className='clickToLoginBtn'>Click here to <button id='loginRedirect' onClick={loginRedirect}><u>Login</u></button></div>
    </>
  )
}

export default Signup;