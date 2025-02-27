// Example of how to add items
const handleAddToCart = () => {
  addToCart({
    id: product._id, // Make sure this matches what you're checking in removeFromCart
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: 1
  });
  toast.success(`Added ${product.name} to cart!`);
}; 