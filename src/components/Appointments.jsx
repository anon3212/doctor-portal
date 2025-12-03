
import React, { useState } from 'react';
import './Appointments.css';

const MOCK_APPOINTMENTS_LIST = [
  { 
    id: 201, 
    time: '8:00 AM', 
    patient: 'Sam Jones', 
    purpose: 'Checkup', 
    date: 'Dec 03, 2025',
    patientId: 'P-201',
    contact: '+1 555-0123',
    email: 'sam.jones@example.com',
    duration: '30 minutes',
    status: 'Confirmed',
    notes: 'Routine annual checkup. Patient requested blood work.'
  },
  { 
    id: 202, 
    time: '10:30 AM', 
    patient: 'Lisa Cheng', 
    purpose: 'Follow-up', 
    date: 'Dec 03, 2025',
    patientId: 'P-202',
    contact: '+1 555-0456',
    email: 'lisa.cheng@example.com',
    duration: '45 minutes',
    status: 'Confirmed',
    notes: 'Follow-up on previous treatment. Bring MRI results.'
  },
  { 
    id: 203, 
    time: '1:00 PM', 
    patient: 'Mike Rivas', 
    purpose: 'New Patient', 
    date: 'Dec 04, 2025',
    patientId: 'P-203',
    contact: '+1 555-0789',
    email: 'mike.rivas@example.com',
    duration: '60 minutes',
    status: 'Pending',
    notes: 'New patient intake. Complete medical history required.'
  },
];

const Appointments = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <div className="appointments-page">
      <h2>Appointments Schedule</h2>

      <div className="appointments-controls">
        <h3>December 3, 2025</h3>
      </div>

      <div className="appointments-list-container">
        {MOCK_APPOINTMENTS_LIST.map(apt => (
          <div key={apt.id} className="appointment-list-item">
            <div className="appointment-time">{apt.time}</div>
            <div className="patient-name-info">
              <span className="patient-name">{apt.patient}</span>
              <span className="purpose">{apt.purpose}</span>
            </div>
            <div className="appointment-actions">
              <button 
                className="detail-btn"
                onClick={() => handleViewDetails(apt)}
              >
                Detail
              </button>
            </div>
          </div>
        ))}
      </div>

      {}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            <button className="modal-close" onClick={handleCloseModal}>
              ×
            </button>
            <h2>Appointment Details</h2>
            {selectedAppointment && (
              <div className="appointment-details">
                <div className="detail-section">
                  <h3>Appointment Information</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <strong>Date:</strong> {selectedAppointment.date}
                    </div>
                    <div className="detail-item">
                      <strong>Time:</strong> {selectedAppointment.time}
                    </div>
                    <div className="detail-item">
                      <strong>Duration:</strong> {selectedAppointment.duration}
                    </div>
                    <div className="detail-item">
                      <strong>Purpose:</strong> {selectedAppointment.purpose}
                    </div>
                    <div className="detail-item">
                      <strong>Status:</strong> 
                      <span className={`status-tag status-${selectedAppointment.status.toLowerCase()}`}>
                        {selectedAppointment.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Patient Information</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <strong>Patient ID:</strong> {selectedAppointment.patientId}
                    </div>
                    <div className="detail-item">
                      <strong>Name:</strong> {selectedAppointment.patient}
                    </div>
                    <div className="detail-item">
                      <strong>Contact:</strong> {selectedAppointment.contact}
                    </div>
                    <div className="detail-item">
                      <strong>Email:</strong> {selectedAppointment.email}
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Notes</h3>
                  <div className="notes-content">
                    <p>{selectedAppointment.notes}</p>
                  </div>
                </div>
              </div>
            )}
            <div className="modal-actions">
              <button className="btn-primary">Reschedule</button>
              <button className="btn-warning">Cancel Appointment</button>
              <button className="btn-secondary" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;