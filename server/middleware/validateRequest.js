const schemas = require('../utils/schemaValidation');

const validateRequest = (modelName) => {
    return (req, res, next) => {
        // Create a copy of required fields and remove auth-handled fields
        const requiredFields = {...schemas[modelName].required_fields};
        delete requiredFields.owner;  // owner comes from auth token
        
        // For PUT/PATCH requests, don't require all fields
        if (req.method === 'PUT' || req.method === 'PATCH') {
            // Only validate the fields that are being updated
            const missingFields = [];
            for (let field in req.body) {
                if (requiredFields[field] && !req.body[field]) {
                    missingFields.push(field);
                }
            }
            
            if (missingFields.length > 0) {
                return res.status(400).json({
                    error: `Invalid values for fields: ${missingFields.join(', ')}`,
                    example: schemas[modelName].example_data
                });
            }
        } else {
            // For POST requests, require all fields
            const missingFields = [];
            for (let field in requiredFields) {
                if (!req.body[field]) {
                    missingFields.push(field);
                }
            }
            
            if (missingFields.length > 0) {
                return res.status(400).json({
                    error: `Missing required fields: ${missingFields.join(', ')}`,
                    example: schemas[modelName].example_data
                });
            }
        }

        next();
    };
};

module.exports = validateRequest; 