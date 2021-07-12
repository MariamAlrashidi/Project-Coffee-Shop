const router = require("express").Router();
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const salt = 10;
var bodyParser = require('body-parser')
let passport = require("../helper/ppConfig");

// Import User Model
const User = require("../models/User");

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.use(cookieParser());

// HTTP GET - Signup Route - To load the signup form
router.get("/auth/signup", (req, res) => {
  res.render("auth/signup");
});

// HTTP POST - Signup Route - To save the data
router.post("/auth/signup", (req, res) => {
  if(req.body.password != req.body.rePass){
    res.redirect('?error=1');
  }

  let user = new User(req.body);
  user.save();
  res.redirect('/auth/signin');
});

// HTTP GET - Signin Route - To load the signin form
router.get("/auth/signin", (req, res) => {
  res.render("auth/signin");
});

// HTTP POST - Signin Route - To login the user
router.post("/auth/signin", (req, res) => {
  User.findOne({ emailAddress: req.body.emailAddress, password: req.body.password }).then((user) => {
    if(!user) { return res.status(404).send('Failed Auth'); }
    // success part :
    res.cookie('auth',`${user._id}:${req.body.password}`, { maxAge: 900000, httpOnly: true });
    res.redirect('/');
  }).catch((e) => {//bad request 
    res.status(400).send(e);
  });
});

// HTTP GET - Logout Route
router.get("/auth/logout", (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
})

module.exports = router;