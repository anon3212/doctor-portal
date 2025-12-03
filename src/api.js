// api.js
const API = "https://n2yd9e2b84.execute-api.ap-southeast-1.amazonaws.com/v1";

const USE_MOCK_DATA = false; 

const mockPatientsData = [
    { id: 'MOCK_101', name: 'Vlad Bautista (MOCK)', dob: '1985-04-12', doctorId: 'DOC_123' },
    { id: 'MOCK_102', name: 'Norhaifah Alion (MOCK)', dob: '1970-01-05', doctorId: 'DOC_123' },
    { id: 'MOCK_103', name: 'Elias Thorne (MOCK)', dob: '1992-11-20', doctorId: 'DOC_123' },
];

export async function getPatients(doctorId) {
    if (USE_MOCK_DATA) {
        console.log(`[MOCK API] Returning mock data for doctor: ${doctorId}`);
        await new Promise(resolve => setTimeout(resolve, 500)); 
        return mockPatientsData;
    }
    
    const url = `${API}/patients?doctorId=${doctorId}`;
    const response = await fetch(url);
    
    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({})); 
        throw new Error(errorBody.message || `HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json(); 
    return data;
}

export async function getAppointments() {
    const response = await fetch(`${API}/appointments`);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json(); 
}