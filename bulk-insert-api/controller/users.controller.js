const usersModel = require('../models/users.model');
const db = require('../config/db');

exports.bulkInsert = async (req, res) => {
    try {
        // Initialize request-scoped tracking variables
        const requestData = {
            successRecords: [],
            failedRecords: [],
            duplicateRecords: [],
            existingRecords: [],
            validRecords: []
        };

        const emailSet = new Set();

        // Step 1: Check for duplicates within the batch
        for (let i = 0; i < req.body.length; i++) {
            const user = req.body[i];
            
            if (emailSet.has(user.email)) {
                requestData.duplicateRecords.push({
                    index: i,
                    email: user.email,
                    record: user,
                    message: 'Duplicate email in batch request'
                });
            } else {
                emailSet.add(user.email);
                requestData.validRecords.push({
                    index: i,
                    data: user
                });
            }
        }

        // Step 2: Check if emails already exist in database
        const validEmails = requestData.validRecords.map(v => v.data.email);
        let existingEmailSet = new Set();

        if (validEmails.length > 0) {
            const [existingRecords] = await db.query(
                'SELECT email FROM customer_users WHERE email IN (?)',
                [validEmails]
            );
            existingRecords.forEach(record => {
                existingEmailSet.add(record.email);
            });
        }

        // Separate records that already exist
        const recordsToInsert = [];
        for (const record of requestData.validRecords) {
            if (existingEmailSet.has(record.data.email)) {
                requestData.existingRecords.push({
                    index: record.index,
                    email: record.data.email,
                    record: record.data,
                    message: 'Email already exists in database'
                });
            } else {
                recordsToInsert.push({
                    index: record.index,
                    data: record.data
                });
            }
        }

        // Step 3: Insert records one by one to handle partial failures
        for (const record of recordsToInsert) {
            const result = await usersModel.insertSingleRecord(record.data);
            
            if (result.success) {
                requestData.successRecords.push({
                    index: record.index,
                    email: record.data.email,
                    record: record.data,
                    message: 'Record inserted successfully'
                });
            } else {
                requestData.failedRecords.push({
                    index: record.index,
                    email: record.data.email,
                    record: record.data,
                    error: result.error
                });
            }
        }

        // Step 4: Build comprehensive response
        const response = {
            summary: {
                totalRequested: req.body.length,
                successCount: requestData.successRecords.length,
                failedCount: requestData.failedRecords.length,
                duplicateCount: requestData.duplicateRecords.length,
                alreadyExistCount: requestData.existingRecords.length
            },
            results: {
                successful: requestData.successRecords,
                failed: requestData.failedRecords,
                duplicates: requestData.duplicateRecords,
                alreadyExist: requestData.existingRecords
            }
        };

        // Determine status code: 200 if all success, 207 for partial success, 400 if all failed
        let statusCode = 200;
        if (requestData.failedRecords.length > 0 && requestData.successRecords.length > 0) {
            statusCode = 207; // Multi-Status
        } else if (requestData.successRecords.length === 0 && 
                   (requestData.failedRecords.length > 0 || req.body.length > 0)) {
            statusCode = 400;
        }

        res.status(statusCode).json(response);

    } catch (error) {
        console.error('Bulk insert error:', error);
        res.status(500).json({
            error: 'Internal server error during bulk insert',
            message: error.message
        });
    }
};