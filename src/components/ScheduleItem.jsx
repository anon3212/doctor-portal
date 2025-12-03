
import React from 'react';
import './ScheduleItem.css';

const ScheduleItem = ({ name, purpose, time, onViewInfo }) => {
  return (
    <div className="schedule-item">
      <div className="schedule-details">
        <h3>{name}</h3>
        <p>{purpose}</p>
        <p>{time}</p>
      </div>
      <button className="view-info-btn" onClick={onViewInfo}>
        View Info
      </button>
    </div>
  );
};

export default ScheduleItem;