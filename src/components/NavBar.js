import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';  // Only import what's needed here

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Doctor Portal</div>
      <div className="navbar-links">
        <NavLink 
          to="/" 
          className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} 
          end 
        >
          Dashboard
        </NavLink> 
        
        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        
        <div className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`}>
          <NavLink 
            to="/patients" 
            className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
            onClick={toggleMenu}
          >
            My Patients
          </NavLink>
          
          <NavLink 
            to="/appointments" 
            className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
            onClick={toggleMenu}
          >
            Appointments
          </NavLink>
          
          <NavLink 
            to="/records" 
            className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
            onClick={toggleMenu}
          >
            Records
          </NavLink>
        </div>

        <a href="#" className="nav-link logout">→ Logout</a>
      </div>
    </nav>
  );
};

export default NavBar;