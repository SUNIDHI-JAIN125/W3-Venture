const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define a schema for the funder information
const funderSchema = new mongoose.Schema({
    walletAddress: { type: String, required: true },
    amount: { type: Number, required: true },
}, { _id: false }); // We don't need an additional ID for each funder

// Define the main schema for the startup
const userStartupSchema = new mongoose.Schema({ 
    name: { type: String, required: true },  // User's name
    email: { type: String, required: true, unique: true },  // User's email
    password: { type: String, required: true },  // User's password
    startupName: { type: String, required: true },  // Startup's name
    description: { type: String, required: true },  // Startup's description
    website: { type: String },  // Startup's website
    docs: { type: String },  // Startup's documentation
    walletAddress: { type: String, required: true, unique: true },  // Startup's wallet address
    image: { type: String, default: 'default-image-url.png' },  // Startup's image with a default value
    funders: [funderSchema],  // Optional array to hold funders and their contributions
    totalFunded: { type: Number, default: 0 },  // Optional total amount funded to the startup
}, { timestamps: true });

// Hash the password before saving the user
userStartupSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords during login
userStartupSchema.methods.comparePassword = function(enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

const UserStartup = mongoose.model('UserStartup', userStartupSchema);
module.exports = UserStartup;
