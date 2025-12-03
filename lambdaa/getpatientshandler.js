const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, QueryCommand } = require('@aws-sdk/lib-dynamodb'); // Use QueryCommand for v3 syntax


const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client); 


exports.handler = async (event) => {
    
    const TABLE_NAME = 'PatientsTable'; 
    
    
    const doctorId = event.queryStringParameters?.doctorId;
    
    

    try {
        const params = {
            TableName: TABLE_NAME,
            IndexName: 'DoctorId-Index',
            KeyConditionExpression: 'doctorId = :docId', 
            ExpressionAttributeValues: {
                ':docId': doctorId
            }
        };
        
        
        const command = new QueryCommand(params);
        const result = await ddbDocClient.send(command);
        
        
        const patients = result.Items || [];

        
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type"
            },
            body: JSON.stringify(patients), 
        };

    } catch (error) {
        console.error("Error fetching patients:", error);
        
    }
};