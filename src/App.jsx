import React, { useState } from 'react';  // Add useState
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import MyPatients from './components/MyPatients'; 
import Appointments from './components/Appointments'; 
import Records from './components/Records'; 
import './App.css'; 

// Updated NavBar with hamburger menu
const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log('Menu toggled:', !isMenuOpen);
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

const App = () => {
  return (
    <BrowserRouter> 
      <div className="app-layout">
        <NavBar />
        <main className="app-main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} /> 
            <Route path="/patients" element={<MyPatients />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/records" element={<Records />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;