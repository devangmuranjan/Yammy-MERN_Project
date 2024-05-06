const express = require("express");
const router = express.Router()
const Order = require("../models/Orders")

// Route to handle incoming order data
router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    // Add order date to the beginning of the data array
    await data.splice(0, 0, { Order_date: req.body.order_date })

    // Check if the email exists in the database
    let eId = await Order.findOne({ email: req.body.email })    
    console.log(eId)

    // If email does not exist, create a new order
    if (eId === null) {
        try {
            console.log(data)
            console.log(req.body.email)

            // Create a new order document in the database
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.status("Server Error", error.message)
        }
    }
    // If email exists, update the existing order
    else {
        try {
            // Update the order data by pushing new data to the existing array
            await Order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})

// Route to fetch order data for a specific user
router.post('/myOrderData', async (req, res) => {
    try {
        console.log(req.body.email)
        // Find the order data for the specified email
        let eId = await Order.findOne({ 'email': req.body.email })
        res.json({ orderData: eId })
    } catch (error) {
        res.send("Error", error.message)
    }
})

module.exports = router;
