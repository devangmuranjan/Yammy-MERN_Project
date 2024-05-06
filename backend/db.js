const mongoose = require('mongoose');
const { Await } = require('react-router-dom');

// MongoDB connection URL
const mongoURL = "mongodb+srv://Yammy:Yammy123@cluster0.jbnvuhg.mongodb.net/Yammymern?retryWrites=true&w=majority&appName=Cluster0"

// Function to connect to MongoDB and fetch initial data
const mongoDB = async ()=> {
  // Connect to MongoDB Atlas
  await mongoose.connect(mongoURL)
  .then(async() => {
    console.log('Connected to MongoDB Atlas');

    // Fetch initial data from MongoDB collections
    const Data = await mongoose.connection.db.collection("food_items").find({}).toArray();
    const catData = await mongoose.connection.db.collection("foodCategory").find({}).toArray();

    // Set global variables for food items and categories
    global.food_items = Data;
    global.foodCategory = catData;
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });
}

// Call the mongoDB function to establish the MongoDB connection and fetch initial data
mongoDB();

module.exports = mongoDB;
