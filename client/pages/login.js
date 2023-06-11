import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

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
    .then(response => console.log(response.message))
    .catch(err => {
      console.log('loginUserError', err);
    })

    navigate('/dashboard', {replace: true});
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
    <div>

    <h1 id='loginTitle'>Login to Debtless</h1>
    <div id='loginContainer'>
      <form id='loginForm'>
        <label htmlFor='lemail'>Email: </label>
        <input type='text' id='lemail' onChange={handleEmailInput} placeholder='Enter Email'></input> <br></br>
        <label htmlFor='lpassword'>Password: </label>
        <input type='password' id='lpassword' onChange={handlePassInput} placeholder='Enter Password'></input><br></br>
        <button type='submit' onClick={loginUser}>Login</button>
      </form>
    </div>
      <div id='needAccount'>Need an account?<button id='resignup' onClick={signUpRedirect}><u>Signup</u></button></div>
    </div>
  )
}

export default Login;