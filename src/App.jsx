

import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import MyPatients from './components/MyPatients'; 
import Appointments from './components/Appointments'; 
import Records from './components/Records'; 
import './App.css'; 





const NavBar = () => (
  <nav className="navbar">
    <div className="navbar-brand">Doctor Portal</div>
    <div className="navbar-links">
      {}
      <NavLink 
        to="/" 
        className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} 
        end 
      >
        Dashboard
      </NavLink> 
      
      {}
      <NavLink 
        to="/patients" 
        className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
      >
        My Patients
      </NavLink>
      
      {}
      <NavLink 
        to="/appointments" 
        className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
      >
        Appointments
      </NavLink>
      
      {}
      <NavLink 
        to="/records" 
        className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
      >
        Records
      </NavLink>

      <a href="#" className="nav-link logout">→ Logout</a>
    </div>
  </nav>
);



const App = () => {
  return (
    
    <BrowserRouter> 
      <div className="app-layout">
        <NavBar />
        <main className="app-main-content">
          {}
          <Routes>
            {}
            <Route path="/" element={<Dashboard />} /> 
            
            {}
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