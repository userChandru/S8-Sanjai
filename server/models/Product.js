const mongoose = require("mongoose");

/**
 * Product Model
 * @example
 * {
 *   product_name: "Organic Rice",
 *   product_description: "Premium quality organic rice",
 *   product_image: "https://...",
 *   product_type: "Product",
 *   product_category: "Grocery",
 *   base_price: 100,
 *   min_price: 80
 * }
 */
const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_description: {
      type: String,
      required: true
    },
    product_image: {
      type: String,
      required: true
    },
    product_type: {
      type: String,
      required: true,
      enum: ["Product", "Digital", "Service"],
    },
    product_category: {
      type: String,
      required: true,
      enum: [
        "Grocery",
        "Electronics",
        "Clothing",
        "Medicines",
        "Bakery",
        "Automotive",
        "Furniture",
        "Technology",
        "Healthcare",
      ],
    },
    base_price: {
      type: Number,
      required: true,
      min: 0,
    },
    min_price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Validation to ensure base_price >= min_price
productSchema.pre("save", function (next) {
  const schemaFields = require('../utils/schemaValidation').products.required_fields;
  const missingFields = [];

  for (let field in schemaFields) {
    if (!this[field]) {
      missingFields.push(field);
    }
  }

  if (missingFields.length > 0) {
    next(new Error(`Missing required fields: ${missingFields.join(', ')}`));
  } else {
    if (this.base_price < this.min_price) {
      return next(new Error("base_price cannot be less than min_price"));
    }
    next();
  }
});

module.exports = mongoose.model("Product", productSchema);
