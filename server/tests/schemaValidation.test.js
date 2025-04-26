const Business = require('../models/Business');
const User = require('../models/User');
const Inventory = require('../models/Inventory');
const Product = require('../models/Product');
const schemas = require('../utils/schemaValidation');

describe('Schema Validation Tests', () => {
    describe('Business Schema', () => {
        test('Schema matches validation definition', () => {
            const businessSchema = Business.schema.obj;
            const requiredFields = schemas.business.required_fields;

            for (let field in requiredFields) {
                expect(businessSchema).toHaveProperty(field);
                expect(businessSchema[field].type).toBeDefined();
                expect(businessSchema[field].required).toBe(true);
            }
        });

        test('Example data matches schema', () => {
            const example = schemas.business.example_data;
            const business = new Business(example);
            const validationError = business.validateSync();
            expect(validationError).toBeUndefined();
        });
    });

    describe('User Schema', () => {
        test('Schema matches validation definition', () => {
            const userSchema = User.schema.obj;
            const requiredFields = schemas.user.required_fields;

            for (let field in requiredFields) {
                expect(userSchema).toHaveProperty(field);
                expect(userSchema[field].type).toBeDefined();
                expect(userSchema[field].required).toBe(true);
            }
        });

        test('Example data matches schema', () => {
            const example = schemas.user.example_data;
            const user = new User(example);
            const validationError = user.validateSync();
            expect(validationError).toBeUndefined();
        });
    });

    describe('Inventory Schema', () => {
        test('Schema matches validation definition', () => {
            const inventorySchema = Inventory.schema.obj;
            const requiredFields = schemas.inventory.required_fields;

            for (let field in requiredFields) {
                expect(inventorySchema).toHaveProperty(field);
                expect(inventorySchema[field].type).toBeDefined();
                expect(inventorySchema[field].required).toBe(true);
            }
        });

        test('Example data matches schema', () => {
            const example = schemas.inventory.example_data;
            const inventory = new Inventory(example);
            const validationError = inventory.validateSync();
            expect(validationError).toBeUndefined();
        });

        test('Products array validation', () => {
            const inventory = new Inventory({
                business: '67bc311c3d7caf05bb345cfd',
                products: [{
                    product: '67bc311c3d7caf05bb345d20',
                    price: -100, // Invalid price
                    quantity: -5, // Invalid quantity
                    offer: 150, // Invalid offer percentage
                    bought_price: 80,
                    for_sale: true
                }]
            });
            const validationError = inventory.validateSync();
            expect(validationError).toBeDefined();
        });
    });

    describe('Product Schema', () => {
        test('Schema matches validation definition', () => {
            const productSchema = Product.schema.obj;
            const requiredFields = schemas.products.required_fields;

            for (let field in requiredFields) {
                expect(productSchema).toHaveProperty(field);
                expect(productSchema[field].type).toBeDefined();
                expect(productSchema[field].required).toBe(true);
            }
        });

        test('Example data matches schema', () => {
            const example = schemas.products.example_data;
            const product = new Product(example);
            const validationError = product.validateSync();
            expect(validationError).toBeUndefined();
        });


    });
}); 