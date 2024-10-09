const jwt = require('jsonwebtoken');
const UserStartup = require('../models/UserStartup');

exports.registerStartup = async (req, res) => {
    const { name, email, password, startupName, description, website, docs, walletAddress, image } = req.body;

    try {
        // Check for existing user by email or wallet address
        let user = await UserStartup.findOne({ email });
        if (user) return res.status(400).json({ error: 'User already exists with this email' });

        user = await UserStartup.findOne({ walletAddress });
        if (user) return res.status(400).json({ error: 'User already exists with this wallet address' });

        // Create a new UserStartup
        const newUserStartup = new UserStartup({
            name,
            email,
            password,
            startupName,
            description,
            website,
            docs,
            walletAddress,
            image
        });

        // Save the user and startup info to the database
        await newUserStartup.save();

        // Generate JWT
        const token = jwt.sign({ id: newUserStartup._id }, process.env.JWT_SECRET, { expiresIn: '100d' });

        res.status(201).json({
            message: 'User and Startup registered successfully',
            token,
            userStartup: newUserStartup
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const userStartup = await UserStartup.findOne({ email });
        if (!userStartup) return res.status(400).json({ error: 'Invalid email or password' });

        // Check if password matches
        const isMatch = await userStartup.comparePassword(password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

        // Generate JWT
        const token = jwt.sign({ id: userStartup._id }, process.env.JWT_SECRET, { expiresIn: '100d' });

        res.status(200).json({
            message: 'Login successful',
            token,
            userStartup
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};


exports.updateStartupDetails = async (req, res) => {
    const { name,email,walletAddress,password, startupName, description, website, docs, image } = req.body;
    
    try {
        // Get the user ID from the authenticated request
        const userId = req.user.id;

        // Find the user's startup
        let userStartup = await UserStartup.findById(userId);
        if (!userStartup) return res.status(404).json({ error: 'Startup not found' });

        // Update startup details
        if (startupName) userStartup.startupName = startupName;
        if (description) userStartup.description = description;
        if (website) userStartup.website = website;
        if (docs) userStartup.docs = docs;
        if (image) userStartup.image = image;
        if (walletAddress) userStartup.walletAddress = walletAddress;
        if (name) userStartup.name= name; 
        if (email) userStartup.email = email;
        if (password) userStartup.password = password;


        await userStartup.save();

        res.status(200).json({
            message: 'Startup details updated successfully',
            userStartup
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};




// Deleting the StartUp/Project
exports.deleteUserAndStartup = async (req, res) => {
    try {
        // Get the user ID from the authenticated request
        const userId = req.user.id;

        // Find and delete the user and associated startup
        const userStartup = await UserStartup.findByIdAndDelete(userId);

        if (!userStartup) {
            return res.status(404).json({ error: 'User or Startup not found' });
        }

        res.status(200).json({ message: 'User and associated Startup deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};


exports.getUserStartups = async (req, res) => {
    try {
        // Get the user ID from the authenticated request
        const userId = req.user.id;

        // Find the user with their startup information
        const userStartup = await UserStartup.findById(userId);

        if (!userStartup) {
            return res.status(404).json({ error: 'No startup found for this user' });
        }

        // Return the user's startup information
        res.status(200).json({
            id: userStartup._id,
            startupName: userStartup.startupName,
            description: userStartup.description,
            website: userStartup.website,
            docs: userStartup.docs,
            walletAddress: userStartup.walletAddress,
            image: userStartup.image
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};


exports.getAllStartups = async (req, res) => {
    try {
        // Fetch all startups from the database
        const allStartups = await UserStartup.find();

        // Return all startups
        res.status(200).json(allStartups);
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};

exports.getStartupById = async (req, res) => {
    const { id } = req.params; 

    try {
        const startup = await UserStartup.findById(id);

        if (!startup) {
            return res.status(404).json({ error: 'Startup not found' });
        }

        // Return the startup details including funders and totalFunded
        res.status(200).json({
            id: startup._id,
            startupName: startup.startupName,
            description: startup.description,
            website: startup.website,
            docs: startup.docs,
            walletAddress: startup.walletAddress,
            image: startup.image,
            totalFunded: startup.totalFunded,
            funders: startup.funders, // Include funders array
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};



// funders update  - 
exports.fundStartup = async (startupId, walletAddress, amount) => {
    try {
        // Find the startup by its ID
        const startup = await UserStartup.findById(startupId);

        if (!startup) {
            throw new Error('Startup not found');
        }

        // Update the total funded amount
        startup.totalFunded += amount;

        // Check if the funder already exists in the funders array
        const funderIndex = startup.funders.findIndex(funder => funder.walletAddress === walletAddress);

        if (funderIndex >= 0) {
            // If funder exists, update the amount they have funded
            startup.funders[funderIndex].amount += amount;
        } else {
            // If funder doesn't exist, add a new funder to the array
            startup.funders.push({
                walletAddress,
                amount
            });
        }

        // Save the updated startup document
        await startup.save();

        return startup;
    } catch (error) {
        console.error('Error funding startup:', error);
        throw error;
    }
};



