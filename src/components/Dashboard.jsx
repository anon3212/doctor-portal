import React from 'react';
import DashboardCard from './DashboardCard';
import ScheduleItem from './ScheduleItem';
import '../App.css'; 
import './Dashboard.css'; 

const MOCK_APPOINTMENTS = [
  { id: 1, name: 'Maria dela Cruz', purpose: 'General Checkup', time: '9:00 AM' },
  { id: 2, name: 'Juan Santos', purpose: 'Follow-up', time: '10:30 AM' },
  { id: 3, name: 'Ana Rodriguez', purpose: 'Consultation', time: '2:00 PM' },
];

const Dashboard = () => {
  const handleViewInfo = (patient) => {
    alert(`Patient Info:\nName: ${patient.name}\nPurpose: ${patient.purpose}\nTime: ${patient.time}`);
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <div className="dashboard-cards-grid">
        <DashboardCard
          icon="clock"
          title="Today's Appointments"
          value="8"
        />
        <DashboardCard
          icon="heartbeat"
          title="Pending Diagnosis"
          value="3"
        />
        <DashboardCard
          icon="users"
          title="Recent Patients"
          value="24"
        />
      </div>

      <div className="schedule-section">
        <h2>Today's Schedule</h2>
        
        {MOCK_APPOINTMENTS.map((item) => (
          <ScheduleItem 
            key={item.id}
            name={item.name}
            purpose={item.purpose}
            time={item.time}
            onViewInfo={() => handleViewInfo(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;