import React, { useState } from "react"; // ⬅️ Import useState
import { useQuery } from "@tanstack/react-query";
import { getpatients } from "../api";

const CURRENT_DOCTOR_ID = 'DOC_123'; 


const PatientModal = ({ patient, onClose }) => {
    if (!patient) return null;

    return (
        
        <div className="modal-overlay" onClick={onClose}> 
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                <h2>Patient Record: {patient.full_name}</h2>

                {}
                <div className="record-section">
                    <h3>Personal Information</h3>
                    <div className="record-grid">
                        <div className="record-item">
                            <strong>Patient ID:</strong> {patient.patient_id}
                        </div>
                        <div className="record-item">
                            <strong>Doctor ID:</strong> {patient.doctorId}
                        </div>
                        <div className="record-item">
                            <strong>Date of Birth:</strong> {patient.birth_date}
                        </div>
                        <div className="record-item">
                            {}
                            <strong>Gender:</strong> 
                            <span className={`status-tag ${patient.gender === 'M' ? 'status-active' : 'status-inactive'}`}>
                                {patient.gender}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="record-section">
                    <h3>Contact & Location</h3>
                    <div className="record-grid">
                        <div className="record-item">
                            <strong>Contact No.:</strong> {patient.contact_no}
                        </div>
                        <div className="record-item">
                            <strong>Clinic ID:</strong> {patient.clinic_id}
                        </div>
                        <div className="record-item">
                            <strong>Address:</strong> {patient.address}
                        </div>
                        <div className="record-item">
                            <strong>Last Updated:</strong> {patient.updated_at ? new Date(patient.updated_at).toLocaleDateString() : 'N/A'}
                        </div>
                    </div>
                </div>

                <div className="modal-actions">
                    <button className="btn-secondary" onClick={onClose}>Close</button>
                    {}
                </div>
            </div>
        </div>
    );
};


function MyPatients() {
    
    const [selectedPatient, setSelectedPatient] = useState(null); 

    const { 
        data: patients, 
        isPending, 
        isError, 
        error 
    } = useQuery({
        queryKey: ["patients", CURRENT_DOCTOR_ID], 
        queryFn: () => getpatients(CURRENT_DOCTOR_ID), 
  });
  
    if (isPending) {
        return <div className="patient-list-container">Loading patients...</div>;
    }

    if (isError) {
        console.error("React Query error:", error);
        return <div className="patient-list-container">Error loading patients: {error.message}</div>;
    }

    
    const openModal = (patient) => {
        setSelectedPatient(patient);
    };

    
    const closeModal = () => {
        setSelectedPatient(null);
    };

    return (
        <div className="patient-list-container">
              <h2>Patient List</h2>
      
              {patients && Array.isArray(patients) && patients.length > 0 ? (
                <table className="patients-table"> 
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Contact No.</th>  {}
                            <th>Gender</th>         {}
                            <th>Doctor ID</th>
                            <th>Actions</th>      {}
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient) => (
                            <tr key={patient.patient_id}>
                              <td>{patient.patient_id}</td>
                              <td>{patient.full_name}</td>
                              <td>{patient.contact_no}</td>
                              <td>{patient.gender}</td>
                              <td>{patient.doctorId}</td>
                                <td>
                                    {}
                                    <button className="view-record-btn" onClick={() => openModal(patient)}>
                                        View Record
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
              ) : (
                <div className="no-patients-message">No patients found for Doctor ID: {CURRENT_DOCTOR_ID}</div>
              )}

            {}
            <PatientModal patient={selectedPatient} onClose={closeModal} />
        </div>
    );
}

export default MyPatients;