
import React, { useState } from 'react';
import './Records.css';

const MOCK_RECORDS = [
  { 
    id: 301, 
    patient: 'Dwight Lao', 
    type: 'Lab Report', 
    date: '2025-11-20', 
    file: 'AL001.pdf',
    details: 'Complete Blood Count (CBC) - Normal ranges. No abnormalities detected.',
    orderedBy: 'Dr. Maria Santos',
    lab: 'Metro Medical Laboratory'
  },
  { 
    id: 302, 
    patient: 'Stella Galinada', 
    type: 'Prescription', 
    date: '2025-10-15', 
    file: 'RS002.pdf',
    details: 'Amoxicillin 500mg TID for 7 days. Ibuprofen 400mg PRN for pain.',
    orderedBy: 'Dr. Juan Cruz',
    pharmacy: 'City Center Pharmacy'
  },
  { 
    id: 303, 
    patient: 'Clara Diaz', 
    type: 'Consultation Note', 
    date: '2025-12-01', 
    file: 'CD003.pdf',
    details: 'Patient presented with elevated BP. Recommended lifestyle modifications and follow-up in 2 weeks.',
    orderedBy: 'Dr. Robert Lim',
    department: 'Cardiology'
  },
];

const Records = () => {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewRecord = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <div className="records-page">
      <h2>Medical Records and Reports</h2>
      
      {}
      <div className="records-search-bar">
        <input type="text" placeholder="Search records by patient or type..." className="search-input" />
        <select className="filter-select">
          <option>All Types</option>
          <option>Lab Report</option>
          <option>Prescription</option>
          <option>Consultation Note</option>
        </select>
        <button className="search-button">Search</button>
      </div>

      {}
      <table className="records-table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Type</th>
            <th>Date</th>
            <th>File Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_RECORDS.map(record => (
            <tr key={record.id}>
              <td>{record.patient}</td>
              <td>{record.type}</td>
              <td>{record.date}</td>
              <td>{record.file}</td>
              <td>
                <button 
                  className="view-record-btn"
                  onClick={() => handleViewRecord(record)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            <button className="modal-close" onClick={handleCloseModal}>
              ×
            </button>
            <h2>Record Details</h2>
            {selectedRecord && (
              <div className="record-details">
                <div className="detail-section">
                  <h3>Basic Information</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <strong>Patient:</strong> {selectedRecord.patient}
                    </div>
                    <div className="detail-item">
                      <strong>Record Type:</strong> {selectedRecord.type}
                    </div>
                    <div className="detail-item">
                      <strong>Date:</strong> {selectedRecord.date}
                    </div>
                    <div className="detail-item">
                      <strong>File Name:</strong> {selectedRecord.file}
                    </div>
                    <div className="detail-item">
                      <strong>Ordered By:</strong> {selectedRecord.orderedBy}
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Details</h3>
                  <div className="details-content">
                    <p>{selectedRecord.details}</p>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Additional Information</h3>
                  <div className="additional-info">
                    {selectedRecord.lab && (
                      <p><strong>Laboratory:</strong> {selectedRecord.lab}</p>
                    )}
                    {selectedRecord.pharmacy && (
                      <p><strong>Pharmacy:</strong> {selectedRecord.pharmacy}</p>
                    )}
                    {selectedRecord.department && (
                      <p><strong>Department:</strong> {selectedRecord.department}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className="modal-actions">
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

export default Records;