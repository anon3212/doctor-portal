// This is your Lambda handler function
exports.handler = async (event) => {
    // 1. Log the incoming request body for debugging
    console.log("Received event:", JSON.stringify(event, null, 2));

    let body;
    try {
        // API Gateway sends the request body as a string, so we must parse it
        body = JSON.parse(event.body); 
    } catch (e) {
        console.error("Error parsing request body:", e);
        return {
            statusCode: 400,
            headers: { "Access-Control-Allow-Origin": "*" }, // CORS header for failure
            body: JSON.stringify({ message: "Invalid JSON format in request body." }),
        };
    }

    // 2. Extract Data (Example extraction based on your Dashboard.jsx payload)
    const { patientId, diagnosisNotes, prescriptions, treatments } = body;

    // --- Replace this with actual database logic (e.g., DynamoDB put/update) ---
    /* await db.put({
           TableName: 'MedicalRecordsTable',
           Item: {
               recordId: Date.now().toString(),
               patientId: patientId,
               date: new Date().toISOString(),
               diagnosis: diagnosisNotes,
               prescriptions: prescriptions,
               treatments: treatments
           }
       }).promise();
    */
    // --- End Database Logic ---

    // 3. Return a successful response (Crucial for the front-end fetch call)
    const response = {
        statusCode: 200,
        // *** CRITICAL: CORS HEADER REQUIRED ***
        headers: {
            "Access-Control-Allow-Origin": "*", // Allows requests from your React app
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            message: `Record for Patient ID ${patientId} saved successfully.`,
            record_id: 'R' + Date.now() // Mock ID
        }),
    };

    return response;
};