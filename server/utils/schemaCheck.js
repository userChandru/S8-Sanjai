const schemas = require('./schemaValidation');
const Business = require('../models/Business');
const User = require('../models/User');
const Inventory = require('../models/Inventory');
const Product = require('../models/Product');

function validateSchemas() {
    // Check Business Model
    const businessSchema = Business.schema.obj;
    const businessFields = schemas.business.required_fields;
    validateModelSchema('Business', businessSchema, businessFields);

    // Check User Model
    const userSchema = User.schema.obj;
    const userFields = schemas.user.required_fields;
    validateModelSchema('User', userSchema, userFields);

    // Check Inventory Model
    const inventorySchema = Inventory.schema.obj;
    const inventoryFields = schemas.inventory.required_fields;
    validateModelSchema('Inventory', inventorySchema, inventoryFields);

    // Check Product Model
    const productSchema = Product.schema.obj;
    const productFields = schemas.products.required_fields;
    validateModelSchema('Product', productSchema, productFields);
    
    console.log('All schemas validated successfully');
}

function validateModelSchema(modelName, schema, requiredFields) {
    for (let field in requiredFields) {
        if (!schema[field]) {
            throw new Error(`Missing required field in ${modelName} model: ${field}`);
        }
    }
}

module.exports = validateSchemas; 