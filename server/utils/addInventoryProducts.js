const axios = require('axios');
const inventoryData = require('../../client/src/data3/inventories.json');

async function addInventoryProducts() {
    try {
        const API_URL = 'http://localhost:5000/api';
        const AUTH_TOKEN = 'Bearer test-token';

        // 1. Get all users
        console.log('1. Getting users...');
        const usersResponse = await axios.get(`${API_URL}/users`, {
            headers: { Authorization: AUTH_TOKEN }
        });
        const users = usersResponse.data;
        console.log(`Found ${users.length} users`);

        // 2. Get products for mapping
        const productsResponse = await axios.get(`${API_URL}/products`, {
            headers: { Authorization: AUTH_TOKEN }
        });
        const productNameToId = {};
        productsResponse.data.forEach(product => {
            productNameToId[product.product_name] = product._id;
        });

        // 3. Process each user
        for (const user of users) {
            console.log(`\nProcessing user: ${user.name}`);
            
            // Get user's businesses
            const businessesResponse = await axios.get(`${API_URL}/businesses/owner/${user._id}`, {
                headers: { Authorization: AUTH_TOKEN }
            });
            const businesses = businessesResponse.data;

            for (const business of businesses) {
                console.log(`Processing business: ${business.business_name}`);
                
                // Find matching inventory data
                const inventoryInfo = inventoryData.inventories.find(
                    inv => inv.business_email === user.email
                );

                if (inventoryInfo) {
                    // Add each product
                    for (const product of inventoryInfo.products) {
                        const productId = productNameToId[product.product_name];
                        if (!productId) {
                            console.warn(`Product not found: ${product.product_name}`);
                            continue;
                        }

                        try {
                            await axios.post(
                                `${API_URL}/inventories/${business._id}/products`,
                                {
                                    productId,
                                    price: product.price,
                                    quantity: product.quantity,
                                    bought_price: product.bought_price,
                                    offer: product.offer || 0,
                                    for_sale: product.for_sale || false,
                                    skipAuth: true
                                },
                                { headers: { Authorization: AUTH_TOKEN } }
                            );
                            console.log(`  ✓ Added ${product.product_name}`);
                        } catch (error) {
                            if (error.response?.status === 400) {
                                console.log(`  ℹ ${product.product_name} already exists`);
                            } else {
                                console.error(`  ❌ Error adding ${product.product_name}:`, error.message);
                            }
                        }
                    }
                }
            }
        }

        console.log('\n✅ All products added successfully');
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

addInventoryProducts(); 