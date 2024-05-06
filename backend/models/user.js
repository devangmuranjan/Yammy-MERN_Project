const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define the schema for the User model
const UserSchema = new Schema({
    name: {
        type: String,
        require: true  // Name is required
    },
    location: {
        type: String,
        require: true  // Location is required
    },
    email: {
        type: String,
        require: true  // Email is required
    },
    password: {
        type: String,
        require: true  // Password is required
    },
    date: {
        type: Date,
        default: Date.now  // Default date is the current date/time
    }
});

// Export the model based on the schema
module.exports = mongoose.model('User', UserSchema);
