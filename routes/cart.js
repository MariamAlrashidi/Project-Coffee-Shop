const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const moment = require('moment');
var methodOverride = require('method-override');

const isLoggedIn = require("../helper/isLoggedIn")

// Use method override
router.use(methodOverride('_method'));

// Import Model
const Product = require("../models/Product");
const Cart = require("../models/Cart");

// Grab the form data
router.use(express.text({type: "application/x-www-form-urlencoded"}));


router.get("/cart", isLoggedIn, (req, res) => {
  Cart.find({ userId: mongoose.Types.ObjectId(decodeURIComponent(req.cookies.auth.split(':')[0])) }).then(products => {
    if (!products) {
      res.redirect('?warn=1');
    } else {
      status = true;
      res.render("cart/cart", { products,status });
    }
  })
})


router.get("/cart/:idProduct", isLoggedIn, (req, res) => {
  Product.findOne({ _id: req.params.idProduct }).then(produt => {
    if (!produt) {
      res.redirect('?error=3');
    } else {
      Carted = new Cart({ userId: mongoose.Types.ObjectId(decodeURIComponent(req.cookies.auth.split(':')[0])), name: produt.name , img: produt.img ,price: produt.price, description: produt.description, productId: mongoose.Types.ObjectId(req.params.idProduct) });
      Carted.save()
      res.redirect("/cart");
    }
  })
})

router.delete('/cart/:idProduct', isLoggedIn, (req, res) => {
  Cart.findOneAndDelete({ userId: mongoose.Types.ObjectId(decodeURIComponent(req.cookies.auth.split(':')[0])), _id: mongoose.Types.ObjectId(req.params.idProduct)}).then(cart => {
    if(!cart){
      res.redirect('/cart?notdeleted=1');
    }else{
      res.redirect('/cart?deleted=1');
    }
  })
});

router.put('/cart/:idProduct', isLoggedIn, (req, res) => {
  Cart.findOneAndUpdate({ userId: mongoose.Types.ObjectId(decodeURIComponent(req.cookies.auth.split(':')[0])), _id: mongoose.Types.ObjectId(req.params.idProduct)}, { totalQun: req.body.totalQun }).then(cart => {
    if(!cart){
      res.redirect('/cart?notupdted=1');
    }else{
      res.redirect('/cart?updted=1');
    }
  })
});



module.exports = router;