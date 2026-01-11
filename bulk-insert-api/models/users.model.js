const db = require('../config/db');

const genderMap = {
    'male': 1,
    'female': 2,
    'others': 3
};

// Insert a single record with error handling
exports.insertSingleRecord = async (userData) => {
    try {
        const insertQuery = 'INSERT INTO customer_users (name, gender_id, company, email) VALUES(?, ?, ?, ?)';
        
        const genderId = genderMap[userData.gender];
        if (!genderId) {
            return {
                success: false,
                error: `Invalid gender value: ${userData.gender}. Allowed values: male, female, others`
            };
        }

        await db.execute(insertQuery, [
            userData.name,
            genderId,
            userData.company,
            userData.email
        ]);

        return {
            success: true,
            message: 'Record inserted successfully'
        };

    } catch (error) {
        console.error('Error inserting record:', error);
        
        // Specific error handling for common database errors
        if (error.code === 'ER_DUP_ENTRY') {
            return {
                success: false,
                error: 'Email already exists in database (duplicate key error)'
            };
        } else if (error.code === 'ER_BAD_NULL_ERROR') {
            return {
                success: false,
                error: 'Required field is null or missing'
            };
        } else {
            return {
                success: false,
                error: error.message || 'Unknown database error'
            };
        }
    }
};

// Legacy method - kept for backward compatibility if needed
exports.insert = async (userData) => {
    try {
        const insertQuery = 'INSERT INTO customer_users (name, gender_id, company, email) VALUES(?, ?, ?, ?)';
        
        const updatedUserData = userData.map(user => ({
            ...user,
            gender: genderMap[user.gender]
        }));

        for (let user of updatedUserData) {
            await db.execute(insertQuery, [user.name, user.gender, user.company, user.email]);
        }

        return {
            success: true,
            count: userData.length
        };

    } catch (error) {
        console.error('Error occurred while inserting records--', error);
        return {
            success: false,
            error: error.message
        };
    }
};