const express = require("express");
const router = express.Router()

// Route to fetch food data
router.post(
    "/foodData",
    (req, res) => {
        try {
            // Send food category and items as response
            res.send([global.foodCategory, global.food_items]);
            // Alternatively, send only food items as response
            // res.send([global.food_items]);
        } catch (error) {
            console.log(error.message);
            res.send("Server Error"); // Return server error message
        }
    }
)

module.exports = router;
