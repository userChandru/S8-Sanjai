const Business = require('../models/Business');
const Inventory = require('../models/Inventory');

/**
 * Create new business
 * @param {Object} req.body - Business data
 * @param {string} req.body.business_name - Name of the business
 * @param {string} req.body.business_sector - Business sector
 * @param {number} req.body.capital - Initial capital
 * @param {number} req.body.annual_turnover - Annual turnover
 * @param {string} req.body.business_image - URL of business image
 * @param {string} req.body.location - Business location
 * @example
 * // Request body
 * {
 *   "business_name": "Rootz Prvt Limited",
 *   "business_sector": "Grocery",
 *   "capital": 15000,
 *   "annual_turnover": 100000,
 *   "business_image": "https://...",
 *   "location": "Chennai, Tamil Nadu"
 * }
 */
exports.createBusiness = async (req, res) => {
    try {
        const {
            business_name,
            business_sector,
            capital,
            annual_turnover,
            business_image,
            location
        } = req.body;

        // Create business and inventory in a transaction
        const session = await Business.startSession();
        session.startTransaction();

        try {
            // First create the business
            const business = await Business.create([{
                owner: req.user._id,
                business_name,
                business_sector,
                capital,
                annual_turnover,
                business_image,
                location,
                collaborators: []
            }], { session });

            // Then create the inventory with business reference
            const inventory = await Inventory.create([{
                business: business[0]._id,  // Set business reference
                products: []  // Empty products array initially
            }], { session });

            // Update business with inventory reference
            await Business.findByIdAndUpdate(
                business[0]._id,
                { inventory_id: inventory[0]._id },
                { session }
            );

            await session.commitTransaction();
            
            // Return the business with populated inventory
            const populatedBusiness = await Business.findById(business[0]._id)
                .populate('inventory_id');
                
            res.status(201).json(populatedBusiness);

        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }

    } catch (error) {
        console.error('Create business error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get all businesses
exports.getAllBusinesses = async (req, res) => {
    try {
        const businesses = await Business.find()
            .populate('owner', 'name email')
            .sort({ registration_date: -1 });
        res.json(businesses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get business by ID
exports.getBusinessById = async (req, res) => {
    try {
        const business = await Business.findById(req.params.id)
            .populate('owner', 'name email');
        
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }
        
        res.json(business);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update business
exports.updateBusiness = async (req, res) => {
    try {
        console.log('User ID:', req.user._id); // Debug log
        const business = await Business.findById(req.params.id);
        console.log('Business Owner:', business?.owner); // Debug log
        
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }

        // Check if user is the owner
        if (business.owner.toString() !== req.user._id.toString()) {
            console.log('Auth mismatch:', {
                owner: business.owner.toString(),
                user: req.user._id.toString()
            }); // Debug log
            return res.status(403).json({ message: 'Not authorized' });
        }

        const updatedBusiness = await Business.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.json(updatedBusiness);
    } catch (error) {
        console.error('Update business error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Delete business
exports.deleteBusiness = async (req, res) => {
    try {
        const business = await Business.findById(req.params.id);
        
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }

        // Check if user is the owner
        if (business.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await business.remove();
        res.json({ message: 'Business deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new collaborator
exports.addCollaborator = async (req, res) => {
    try {
        const { collaborator_id } = req.body;
        const business = await Business.findById(req.params.id);
        
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }

        // Check if user is the owner
        if (business.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // Check if already a collaborator
        if (business.collaborators.some(c => c.business.toString() === collaborator_id)) {
            return res.status(400).json({ message: 'Already a collaborator' });
        }

        business.collaborators.push({
            business: collaborator_id,
            partnership_date: new Date()
        });

        await business.save();
        res.json(business);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add this controller method
exports.getBusinessesByOwner = async (req, res) => {
    try {
        const businesses = await Business.find({ owner: req.params.userId });
        res.json(businesses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 