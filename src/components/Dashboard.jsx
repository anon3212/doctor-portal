import React, { useState, useEffect } from 'react';
import '../App.css'; 
import './Dashboard.css'; 

// Endpoints are set correctly based on your API Gateway resources
const CURRENT_DOCTOR_ID = 'DOC_123';
const API_ENDPOINT = 'https://n2yd9e2b84.execute-api.ap-southeast-1.amazonaws.com/v1/records';
const GET_PATIENTS_ENDPOINT = `https://n2yd9e2b84.execute-api.ap-southeast-1.amazonaws.com/v1/patients?doctorId=${CURRENT_DOCTOR_ID}`; 

const Dashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedPatientId, setSelectedPatientId] = useState(null); 
     

    const selectedPatient = appointments.find(p => p.id === selectedPatientId) || { 
        name: 'N/A', 
        age: 0, 
        sex: 'N/A', 
        previousRecords: []
    };

    useEffect(() => {
        const fetchAppointments = async () => {
            // REMOVED faulty if condition:
            // if (GET_PATIENTS_ENDPOINT === 'https://n2yd9e2b84.execute-api.ap-southeast-1.amazonaws.com/v1/patients') {
            //     console.error("ERROR: GET_PATIENTS_ENDPOINT must be set to your API Gateway URL!");
            //     return;
            // }

            try {
                // Fetching the patient list
                const response = await fetch(GET_PATIENTS_ENDPOINT, { 
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                
                if (!response.ok) {
                    // Throw error if status is 4xx or 5xx (e.g., your previous 400 error)
                    throw new Error(`Failed to fetch appointments: ${response.status}`);
                }
                
                const data = await response.json();
                setAppointments(data);
                
                // Select the first patient automatically if the list is not empty
                if (data.length > 0) {
                    setSelectedPatientId(data[0].id);
                }

            } catch (error) {
                console.error("Error fetching patient appointments:", error);
                alert(`Error loading data from API. Please check console. Error: ${error.message}`);
                
                // If the fetch fails, set appointments to an empty array 
                // to prevent potential crashes on render.
                setAppointments([]); 
            }
        };

        fetchAppointments();
    }, []);


    const [diagnosisNotes, setDiagnosisNotes] = useState('');
    const [prescriptions, setPrescriptions] = useState([{ name: '', dosage: '', frequency: '', duration: '' }]);
    const [treatments, setTreatments] = useState([{ name: '', notes: '' }]);

    const handlePatientSelect = (patientId) => {
        setSelectedPatientId(patientId);
        // Reset forms when a new patient is selected
        setDiagnosisNotes('');
        setPrescriptions([{ name: '', dosage: '', frequency: '', duration: '' }]);
        setTreatments([{ name: '', notes: '' }]);
    };

    // Sorts records by date (most recent first) for display
    const sortedRecords = selectedPatient.previousRecords ? selectedPatient.previousRecords.sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    ) : [];

    // Prescription handlers
    const handleAddPrescription = () => {
        setPrescriptions([...prescriptions, { name: '', dosage: '', frequency: '', duration: '' }]);
    };
    const handlePrescriptionChange = (index, field, value) => {
        const newPrescriptions = prescriptions.map((item, i) => {
            if (i === index) return { ...item, [field]: value };
            return item;
        });
        setPrescriptions(newPrescriptions);
    };
    
    // Treatment handlers
    const handleAddTreatment = () => {
        setTreatments([...treatments, { name: '', notes: '' }]);
    };
    const handleTreatmentChange = (index, field, value) => {
        const newTreatments = treatments.map((item, i) => {
            if (i === index) return { ...item, [field]: value };
            return item;
        });
        setTreatments(newTreatments);
    };

    const handleSaveMedicalRecord = async () => {
        const payload = {
            patientId: selectedPatient.id,
            name: selectedPatient.name,
            // Format date as YYYY-MM-DD
            date: new Date().toISOString().split('T')[0], 
            diagnosisNotes: diagnosisNotes,
            // Filter out empty rows
            prescriptions: prescriptions.filter(p => p.name.trim() !== ''), 
            treatments: treatments.filter(t => t.name.trim() !== ''), 
        };
        
        if (!diagnosisNotes.trim()) {
            alert("Diagnosis Notes are required before saving a record.");
            return;
        }

        try {
            console.log("Sending payload:", payload);
            
            // Send the POST request to save the record
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload), 
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("API Error Response:", data);
                throw new Error(data.message || `API call failed with status: ${response.status}`);
            }

            alert(`Record saved successfully! Message: ${data.message || 'No message provided'}`);
            
            // Clear the form after successful save
            setDiagnosisNotes('');
            setPrescriptions([{ name: '', dosage: '', frequency: '', duration: '' }]);
            setTreatments([{ name: '', notes: '' }]);
            
            // OPTIONAL: Refresh appointments list here if you want to see the saved record instantly.
            // fetchAppointments(); 

        } catch (error) {
            console.error("Error saving medical record:", error);
            alert(`Failed to save record. Check the console and API Gateway logs. Error: ${error.message}`);
        }
    };


    return (
        <div className="doctor-dashboard-container">
            <header className="dashboard-header">
                <div className="header-info">
                    <h1>Doctor Dashboard</h1>
                    <p className="welcome-text">Welcome, Dr. Mercado | <span className="specialty">Cardiology</span></p>
                </div>
                <button className="logout-btn">Logout</button>
            </header>

            <div className="main-content-layout">
                <div className="consultations-sidebar">
                    <h2 className="sidebar-title">Today's Consultations</h2>
                    <div className="consultations-list">
                        {appointments.length > 0 ? (
                            appointments.map(appointment => (
                                <div 
                                    key={appointment.id}
                                    className={`schedule-item ${appointment.id === selectedPatientId ? 'active' : ''}`}
                                    onClick={() => handlePatientSelect(appointment.id)}
                                >
                                    <p className="patient-name">{appointment.name}</p>
                                    <p className="appointment-time">{appointment.time}</p>
                                </div>
                            ))
                        ) : (
                            <p className="loading-message">Loading patients... Check API connection.</p>
                        )}
                    </div>
                </div>

                <div className="patient-record-panel">
                    <div className="patient-info-box">
                        <h3>Patient Information</h3>
                        <div className="patient-info-details">
                            <p>Name: <strong>{selectedPatient.name}</strong></p>
                            <p>Age: <strong>{selectedPatient.age} years</strong></p>
                            <p>Sex: <strong>{selectedPatient.sex}</strong></p>
                        </div>
                    </div>

                    <div className="previous-records-box">
                        <h3>Previous Records</h3>
                        {sortedRecords.length > 0 ? (
                            <div className="records-list">
                                {sortedRecords.map((record, index) => (
                                    <div key={index} className="record-item">
                                        <div className="record-header">
                                            <span className="record-date">Date: {record.date}</span>
                                            <span className="record-diagnosis">Diagnosis: {record.diagnosis}</span>
                                        </div>
                                        <p className="record-notes">{record.notes}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="no-records-message">No previous records available for this patient.</p>
                        )}
                    </div>

                    <div className="diagnosis-box">
                        <h3>Diagnosis Notes <span className="required">*</span></h3>
                        <textarea
                            placeholder="Enter diagnosis notes..."
                            rows="5"
                            value={diagnosisNotes}
                            onChange={(e) => setDiagnosisNotes(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="section-box prescription-box">
                        <h3>Prescriptions</h3>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Medicine name</th>
                                    <th>Dosage</th>
                                    <th>Frequency</th>
                                    <th>Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prescriptions.map((p, index) => (
                                    <tr key={index}>
                                        <td><input type="text" value={p.name} onChange={(e) => handlePrescriptionChange(index, 'name', e.target.value)} /></td>
                                        <td><input type="text" value={p.dosage} onChange={(e) => handlePrescriptionChange(index, 'dosage', e.target.value)} /></td>
                                        <td><input type="text" value={p.frequency} onChange={(e) => handlePrescriptionChange(index, 'frequency', e.target.value)} /></td>
                                        <td><input type="text" value={p.duration} onChange={(e) => handlePrescriptionChange(index, 'duration', e.target.value)} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="add-btn" onClick={handleAddPrescription}>+ Add Prescription</button>
                    </div>

                    <div className="section-box procedures-box">
                        <h3>Procedures & Treatments</h3>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Procedure name</th>
                                    <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {treatments.map((t, index) => (
                                    <tr key={index}>
                                        <td><input type="text" value={t.name} onChange={(e) => handleTreatmentChange(index, 'name', e.target.value)} /></td>
                                        <td><input type="text" value={t.notes} onChange={(e) => handleTreatmentChange(index, 'notes', e.target.value)} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="add-btn" onClick={handleAddTreatment}>+ Add Treatment</button>
                    </div>

                    <div className="save-container">
                        <button className="save-medical-record-btn" onClick={handleSaveMedicalRecord}>
                            Save Medical Record
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;