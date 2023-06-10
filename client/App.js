import React from 'react';
import Signup from './pages/signup';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Expenses from './pages/expenses';
import Navbar from './pages/navbar';
import { Link, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import styles from './styles.scss';

const App = () => {
  const location = useLocation();

  const navbarShow = [];
  if (location.pathname !== '/login' && location.pathname !== '/') {
    navbarShow.push(<Navbar />)
  }

  return (
    <>
    <div>
    {/* <h1>Home: {location.pathname} </h1> */}
    {/* <Navbar /> */}
    {navbarShow}
    <Routes>
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/api/expenses' element={<Expenses />} />
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Signup />} />
    </Routes>
    </div>
    </>
  )
};

export default App;
