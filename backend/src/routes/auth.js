const express = require('express');
const { registerStartup, loginUser, updateStartupDetails, deleteUserAndStartup, getUserStartups, getAllStartups, getStartupById ,fundStartup} = require('../controllers/authController.js');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Register a user and their startup
router.post('/register', registerStartup);

// Login a user
router.post('/login', loginUser);

// Update startup details (protected route)
router.put('/update', authMiddleware, updateStartupDetails);

// Delete user and startup (protected route)
router.delete('/delete', authMiddleware, deleteUserAndStartup);

// Get user startups (protected route)
router.get('/startup', authMiddleware, getUserStartups);

// GET all startups
router.get('/startups', getAllStartups);

// GET a specific startup by ID
router.get('/startups/:id', getStartupById);

router.post('/startups/:id/fund', async (req, res) => {
    const { id } = req.params;
    const { walletAddress, amount } = req.body;

    try {
        // Call the fundStartup service function
        const updatedStartup = await fundStartup(id, walletAddress, amount);

        res.status(200).json({ message: 'Funding successful', startup: updatedStartup });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
