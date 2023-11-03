var express = require('express');
var productData = require('../DB/productData');
var {uuid} = require('uuidv4');
var router = express.Router();
const { query,body,validationResult } = require('express-validator');


router.get('/', function(req, res, next) {
   try {
        res.status(200).json(productData);
   } catch (error) {
        console.log(error);
        res.status(500)
   }
});

router.post("/",[
    body().isArray().withMessage("Body must be an array"),
    body().custom((value) => {
        for (const item of value) {
          if (!item.id || !item.productName || !item.price) {
            throw new Error('Each object in the array must have "id," "productName," and "price" fields.');
          }
        }
        return true;
      }),
], function(req, res, next){
    try {
        const result = validationResult(req);
        if(result.isEmpty()){
                let data = req.body;
                console.log(data);
                if(data.length > 1){
                    data.forEach((item)=>{
                        productData.push({
                            id: uuid(),
                            productName: item.productName,
                            price: item.price
                        });
                    })
                }else{
                    productData.push({
                        id: uuid(),
                        productName: req.body[0].productName,
                        price: req.body[0].price
                    });
                }
                res.status(200).json(productData);
        }else{
            res.send({ errors: result.array() });
        }   
    } catch (error) {
        console.log(error);
        res.status(500)
    }
});

module.exports = router;