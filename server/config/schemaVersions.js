module.exports = {
  current: {
    business: "1.0.0",
    user: "1.0.0",
    inventory: "1.0.0",
    products: "1.0.0",
  },
  history: {
    business: [
      {
        version: "1.0.0",
        date: "2024-02-24",
        fields: [
          "owner",
          "business_name",
          "business_sector",
          "capital",
          "annual_turnover",
          "business_image",
          "rating",
          "location",
          "inventory_id",
          "collaborators.business",
          "collaborators.partner_since",
        ],
        nested: {
            collaborators: {
                business: 'ObjectId',
                partner_since: 'Date'
            }
        }
      },
    ],
    user: [
      {
        version: "1.0.0",
        date: "2024-02-24",
        fields: [
          "name",
          "email",
          "role",
          "avatar",
          "join_date",
          "last_active",
          "status",
        ],
      },
    ],
    inventory:[
        {
            version: '1.0.0',
            date: '2024-02-24',
            fields: [
                'business',
                'products.product',
                'products.price',
                'products.quantity',
                'products.offer',
                'products.bought_price',
                'products.for_sale'
            ],
            nested: {
                products: {
                    product: 'ObjectId',
                    price: 'Number',
                    quantity: 'Number',
                    offer: 'Number',
                    bought_price: 'Number',
                    for_sale: 'Boolean'
                }
            }
        }
    ],
    products:[
        {
            version: '1.0.0',
            date: '2024-02-24',
            fields: [
                'product_name',
                'product_description',
                'product_image',
                'product_type',
                'product_category',
                'base_price',
                'min_price',
            ]
        }
    ],
  },
};

