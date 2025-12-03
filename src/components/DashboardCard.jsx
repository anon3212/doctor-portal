

import React from 'react';
import './DashboardCard.css';


const DashboardCard = ({ icon, title, value }) => {
  return (
    <div className="dashboard-card">
      <div className={`card-icon-container icon-${icon}`}>
        {}
        {}
        <span className={`icon-${icon}-shape`}></span>
      </div>
      <p className="card-title">{title}</p>
      <h2 className="card-value">{value}</h2>
    </div>
  );
};

export default DashboardCard;