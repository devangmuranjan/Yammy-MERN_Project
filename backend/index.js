// Import necessary modules
const express = require('express')
const cors = require('cors')

// Create an Express application
const app = express()
const port = 5000

// Import and call the mongoDB function to establish MongoDB connection and fetch initial data
const mongoDB = require("./db")
mongoDB();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Set headers for CORS handling
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-origin", "http://localhost:3000")
  res.setHeader("Access-Control-Allow-headers","origin, X-Requested-with, Content-type,accept")
  next();
});

// Parse incoming JSON data
app.use(express.json());

// Route handling for different API endpoints
app.use('/api',require("./routes/createUser")); // Endpoint for creating a user
app.use('/api',require("./routes/DisplayData")); // Endpoint for displaying data
app.use('/api',require("./routes/OrderData")); // Endpoint for order data

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
