const jsforce = require('jsforce');

const connectToSalesforce = async (credentials) => {
    try {
        const conn = new jsforce.Connection({
            instanceUrl: credentials.instanceUrl,
            accessToken: credentials.accessToken,
        });

        await conn.identity();
        console.log('Connected to Salesforce successfully');
        return conn;
    } catch (error) {
        console.error('Salesforce connection failed:', error.message);
        throw error;
    }
};

module.exports = { connectToSalesforce };