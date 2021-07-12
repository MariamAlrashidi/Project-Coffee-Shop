const express = require('express');

const router = express.Router();
const cookieParser = require('cookie-parser');
const Product = require("../models/Product");

router.use(cookieParser());

// HTTP GET - ROOT ROUTE OF OUR APPLICATION
router.get('/', (req, res) => {
    let status = false;
    if(req.cookies.auth){
        status = true;
    }
	Product.find().then(products => {
        res.render("home/main", {products,status});
    }).catch(err => {
        console.log(err);
    })
});


module.exports = router;