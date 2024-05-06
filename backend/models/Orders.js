const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define the schema for the Order model
const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true  // Email should be unique
    },
    order_data: {
        type: Array,
        required: true,  // Order data is required
    },
});

// Export the model based on the schema
module.exports = mongoose.model('Order', OrderSchema);
