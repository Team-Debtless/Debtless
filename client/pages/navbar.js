import React from 'react';
import { NavLink } from 'react-router-dom';
import debtlessLogo from '../assets/DEBTLESS.svg';
import listIcon from '../assets/list-icon.svg';
import chartIcon from '../assets/chart-icon.svg';
import bgPattern from '../assets/bg-pattern.svg';

const Navbar = () => {
  return (
    <nav className="nav-bar">
      <img src={debtlessLogo} className="nav-logo" />
      <img src={bgPattern} className="nav-bg" />

      <NavLink to="/dashboard" className="nav-menu-item">
          <img src={chartIcon} className="nav-menu-icon" /> Dashboard
      </NavLink>

      <NavLink to="/api/expenses" className="nav-menu-item">
          <img src={listIcon} className="nav-menu-icon" />
          Expenses
      </NavLink>

      {/* <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/signup'>Signup</Link>
        </li> */}
    </nav>
  );
};

export default Navbar;
