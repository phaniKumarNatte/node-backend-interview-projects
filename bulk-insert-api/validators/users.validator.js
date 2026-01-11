const {body,validationResult} = require('express-validator');


// Validate request body is array with max 1000 records
exports.validateBulkInsert = (req, res, next) => {
    if (!Array.isArray(req.body)) {
        return res.status(400).json({
            error: 'Request body must be an array of user objects'
        });
    }

    if (req.body.length === 0) {
        return res.status(400).json({
            error: 'At least 1 record is required'
        });
    }

    if (req.body.length > 1000) {
        return res.status(400).json({
            error: `Maximum 1000 records allowed. Received ${req.body.length}`
        });
    }

    next();
};

exports.userValidationRules = [
                body('*.name').trim().notEmpty().withMessage('name field is required'),
                body('*.gender').notEmpty().withMessage('Gender field is required'),
                body('*.company').trim().notEmpty().withMessage('company field is required'),
                body('*.email').trim().notEmpty().withMessage('Email field is required').isEmail().withMessage('Email must be valid')
            ];

exports.validator = (req,res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
       return res.status(400).json({error:error.array()})
    }
    next();
}
