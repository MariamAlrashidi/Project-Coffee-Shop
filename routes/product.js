const { request, response } = require('express');
const express = require('express')
const router = express.Router()
var app = express()

//const isLoggedIn = require("../helper/isLoggedin")
const Product = require("../models/Product");


// Product Route --GET
router.get('/product/index',(req, res) => {
    Product.find()
        .then(products => {
            console.log(products)
            res.render('home/index', { products })
        
        })
        .catch(err => res.send(err))
})

// Product Route -- POST
router.post('/product', (req, res) => {  
    console.log(req.body)
    Product.create(req.body)
    .then(products => {
      res.status(200).json({product:products})
    //   res.render('home/index', { products })
      console.log(`statusCode: ${res.statusCode}`)
      console.log(res)
  })
  .catch(err => res.send(err))

})

module.exports = router;