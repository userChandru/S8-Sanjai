const schemas = {
    business: {
        required_fields: {
            business_name: 'String',
            business_sector: 'String',
            capital: 'Number',
            annual_turnover: 'Number',
            business_image: 'String',
            location: 'String'
        },
        optional_fields: {
            rating: 'Number',
            inventory_id: 'ObjectId',
            collaborators: 'Array',
            owner: 'ObjectId'
        },
        example_data: {
            "_id": "67bc311c3d7caf05bb345cfd",
            "owner": "67bc31183d7caf05bb345ca4",
            "business_name": "Rootz Prvt Limited",
            "business_sector": "Grocery",
            "capital": 15000,
            "annual_turnover": 100000,
            "business_image": "https://images.unsplash.com/photo-1542838132-92c53300491e",
            "rating": 4.3,
            "location": "Chennai, Tamil Nadu",
            "inventory_id": "67bc311c3d7caf05bb345d11",
            "collaborators": []
        }
    },
    user: {
        required_fields: {
            name: 'String',
            email: 'String',
            avatar: 'String'
        },
        optional_fields: {
            role: 'String',
            join_date: 'Date',
            last_active: 'Date',
            status: 'String'
        },
        example_data: {
            "_id": "67bc31183d7caf05bb345ca4",
            "name": "Chandru",
            "email": "chandru.cb22@bitsathy.ac.in",
            "role": "vendor",
            "avatar": "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
            "join_date": "2025-02-24T08:43:04.473Z",
            "last_active": "2025-02-24T14:28:15.059Z",
            "status": "active"
        }
    },
    inventory: {
        required_fields: {
            business: 'ObjectId'
        },
        optional_fields: {
            products: [{
                product: 'ObjectId',
                price: 'Number',
                quantity: 'Number',
                offer: 'Number',
                bought_price: 'Number',
                for_sale: 'Boolean'
            }]
        },
        example_data: {
            "_id": "67bc311c3d7caf05bb345d11",
            "business": "67bc311c3d7caf05bb345cfd",
            "products": [{
                "product": "67bc311c3d7caf05bb345d20",
                "price": 100,
                "quantity": 50,
                "offer": 10,
                "bought_price": 80,
                "for_sale": true
            }]
        }
    },
    products: {
        required_fields: {
            product_name: 'String',
            product_description: 'String',
            product_image: 'String',
            product_type: 'String',
            product_category: 'String',
            base_price: 'Number',
            min_price: 'Number'
        },
        optional_fields: {},
        example_data: {
            "_id": "67bc311c3d7caf05bb345d20",
            "product_name": "Organic Rice",
            "product_description": "Premium quality organic rice",
            "product_image": "https://images.unsplash.com/photo-rice",
            "product_type": "Product",
            "product_category": "Grocery",
            "base_price": 100,
            "min_price": 80
        }
    }
};

module.exports = schemas; 