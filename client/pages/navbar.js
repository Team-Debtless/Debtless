import React from "react";
import { Link } from 'react-router-dom';
import debtlessLogo from '../assets/DEBTLESS.svg';

const LinkStyles = {
  textDecoration: "none",
  color: "white",
};

const Navbar = () => {
  return (
    <nav className="nav-bar">
      <img src={debtlessLogo} className="nav-logo" />
        <div className="nav-menu-item">
          <Link to='/dashboard' style={LinkStyles}>Dashboard</Link>
        </div>
        <div className="nav-menu-item">
          <Link to='/api/expenses' style={LinkStyles}>Expenses</Link>
        </div>
        {/* <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/signup'>Signup</Link>
        </li> */}

    </nav>
  )
}

export default Navbar;