var express = require('express');
var orderData = require('../DB/orderData');
const { body, validationResult } = require('express-validator');
var router = express.Router();

const validateOrderRequest = [
    body('lineItems').isArray().withMessage('Line items must be an array'),
    body('lineItems.*.product').isString().withMessage('Product name must be a string'),
    body('lineItems.*.quantity').isInt().withMessage('Quantity must be an integer'),
  ];
    // Helper function to get the price of a product (you can replace this with your own data source)
function getItemPrice(product) {
        // Simulated product prices
        const prices = {
          Pineapple: 200,
          Apple: 1000,
          Pencil: 900,
        };
        return prices[product] || 0;
      }     
      // Helper function to calculate the total cost of the order
function calculateTotalCost(lineItems) {
    if (!Array.isArray(lineItems)) {
        throw new Error('Input must be an array of line items.');
      }
    
      // Calculate the total cost
      const totalCost = lineItems.reduce((total, item) => {
        if (typeof item.price !== 'number' || typeof item.quantity !== 'number') {
          throw new Error('Each line item must have numeric "price" and "quantity" values.');
        }
        return total + item.price * item.quantity;
      }, 0);
    
      return totalCost;
}
    

  // Route for placing orders
router.post('/', validateOrderRequest, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    // Process the order
    const orderRequest = req.body;
    const orderResponse = {
      ...orderRequest,
      lineItems: orderRequest.lineItems.map(item => ({
        ...item,
        total: item.quantity * item.price, // Calculate the total for each line item
      })),
      totalCost: calculateTotalCost(orderRequest.lineItems), // Calculate the total cost of the order
    };
  
    // You can save the order data or perform any other actions here
    orderData.push(orderResponse)
    res.status(201).json(orderResponse); // Respond with the order response
  });
  


router.get("/", function(req, res, next){
    try {
        res.status(200).json(orderData);
    } catch (error) {
        console.log(error);
        res.status(500).json(orderData);
    }
});

module.exports = router;
