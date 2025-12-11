// lambdaa/getallrecords.js
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'cdo_medical_records'; 

exports.handler = async (event) => {
    const params = {
        TableName: TABLE_NAME,
    };

    try {
        // Scan is used here to get ALL records for the report page.
        // Be mindful of performance/cost for very large tables.
        const data = await docClient.scan(params).promise();

        return {
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
            body: JSON.stringify(data.Items), // Returns the array of all records
        };
    } catch (error) {
        console.error("Error retrieving all records:", error);
        return {
            statusCode: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ message: "Failed to retrieve all records.", detail: error.message }),
        };
    }
};