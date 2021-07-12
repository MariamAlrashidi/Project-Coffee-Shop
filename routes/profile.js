  
const express = require("express");
const router = express.Router(); 
const moment = require('moment');
const bcrypt = require("bcrypt");
const salt = 10;
const cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
const isLoggedIn = require("../helper/isLoggedIn");
router.use(cookieParser());
// Use method override
router.use(methodOverride('_method'));

// Import Model
const User = require("../models/User");
const Product = require("../models/Product");


// Route to user profile
router.get('/user/profile', isLoggedIn,(req, res) => {
    User.findOne({  _id: decodeURIComponent(req.cookies.auth.split(':')[0]),
                    password: decodeURIComponent(req.cookies.auth.split(':')[1]) 
                }).then((user) => {
                    if(!user) { res.redirect('/auth/signin'); }
                    status = true;
                    res.render("user/profile", { user, moment,status });
    }).catch(err => {
        console.log(err);
    });
});


// Change Password Route - GET
router.get('/user/edit', isLoggedIn, (req, res) => {
    User.findOne({  _id: decodeURIComponent(req.cookies.auth.split(':')[0]),
                    password: decodeURIComponent(req.cookies.auth.split(':')[1]) 
                }).then((user) => {
                    if(!user) { res.redirect('/auth/signin'); }
                    status = true;
                    res.render("user/edit", { user, moment,status });
    }).catch(err => {
        console.log(err);
    });
})



// Edit Profile Route - POST
router.post("/user/profile", (req, res) => {
    let query = { _id: decodeURIComponent(req.cookies.auth.split(':')[0]), password: decodeURIComponent(req.cookies.auth.split(':')[1]) }
    var data = {
        $set: req.body
    }
    console.log(data)
    User.findByIdAndUpdate(query, data, { new: true })
        .then(() => {
            res.redirect("/user/profile")
            console.log(query)
        })
        .catch(err => {
            console.log(err)
        })
})


// Change Password Route - POST
router.post('/user/changepassword', (req, res) => {
    User.findOne({
        _id: decodeURIComponent(req.cookies.auth.split(':')[0]),
        password: req.body.oldPassword
    }).then((user) => {
        if (!user) {
            res.end('the current pass and the new pass does not match');
        } else {
            const userPassword = User.findByIdAndUpdate((decodeURIComponent(req.cookies.auth.split(':')[0])), { password: req.body.password }, { new: true })
                .then(user => {
                    res.render("user/profile", { user });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }).catch(err => {
        console.log(err);
    });

});


module.exports = router;