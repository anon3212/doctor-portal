import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPatients } from "../api";

const CURRENT_DOCTOR_ID = 'DOC_123'; 

function MyPatients() {
  const { 
        data: patients, 
        isPending, 
        isError, 
        error 
    } = useQuery({
        queryKey: ["patients", CURRENT_DOCTOR_ID], 
        queryFn: () => getPatients(CURRENT_DOCTOR_ID), 
  });
  
  if (isPending) {
    return <div>Loading patients...</div>;
  }

  if (isError) {
    console.error("React Query error:", error);
    return <div>Error loading patients: {error.message}</div>;
  }

  return (
    <div>
      <h2>Patient List</h2>
      {}
      {patients && Array.isArray(patients) && patients.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date of Birth (DOB)</th>
              <th>Doctor ID</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td>{patient.dob}</td>
                <td>{patient.doctorId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        
        <div>No patients found for Doctor ID: {CURRENT_DOCTOR_ID}</div>
      )}
    </div>
  );
}

export default MyPatients;