const express = require('express');
const route = express.Router();
const {validateBulkInsert, userValidationRules, validator} = require('../validators/users.validator');
const userBulkInsert = require('../controller/users.controller');


route.post('/bulkInsert', 
    validateBulkInsert,          // Validate array and max 1000 records
    userValidationRules,         // Validate individual field values
    validator,                   // Run validation checks
    userBulkInsert.bulkInsert    // Process bulk insert
);

module.exports = route;