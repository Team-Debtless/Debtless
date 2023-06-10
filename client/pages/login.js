import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const navigate = useNavigate();
  
  const signUpRedirect = () => {
    navigate('/');
  }
  
  const dashRedirect = () =>{
    navigate('/dashboard', {replace: true});
  }
  
  const handleEmailInput = (e) => {
    setEmailInput(e.target.value);
  }
 
  const handlePassInput = (e) => {
    setPassInput(e.target.value);
  }
  return (
    <div id='loginContainer'>
      <h1>Login to Debtless</h1>
      <form>
        <label htmlFor='lemail'>Email: </label>
        <input type='text' id='lemail' placeholder='Enter Email'></input> <br></br>
        <label htmlFor='lpassword'>Password: </label>
        <input type='text' id='lpassword' placeholder='Enter Password'></input><br></br>
      </form>
      <button type='submit' onClick={dashRedirect}>Login</button>
      <div>Need an account?<button id='resignup' onClick={signUpRedirect}><u>Signup</u></button></div>
    </div>
  )
}

export default Login;