// Create new controller for product management
exports.getAvailableProducts = async (req, res) => {
    const products = await Product.find({ 
        owner_id: req.user._id,
        status: 'available'
    });
    res.json(products);
};

exports.addToVendorProducts = async (req, res) => {
    const product = await Product.findById(req.params.id);
    const vendorProduct = new VendorProduct({
        ven_prod_name: product.name,
        ven_prod_bought_price: product.bought_price,
        ven_prod_new_price: req.body.selling_price,
        ven_prod_offer: req.body.offer,
        ven_prod_stock: product.quantity,
        ven_prod_image: product.image,
        ven_prod_desc: product.description
    });
    await vendorProduct.save();
    res.json(vendorProduct);
}; 