const express = require("express");
const mongoose = require("mongoose");
const PORT = 4007;
//const expresslayouts = require("express-ejs-layouts");
var cors = require('cors')
// Initialize express
const app = express();

// Look for static files here in this folder
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
// // Look into the views folder for layout.ejs file
// app.use(expresslayouts);

// Import Routes
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const profileRoute = require('./routes/profile');
const cartRoute = require('./routes/cart');

// Mount Routes
app.use('/', productRoute);
app.use('/', indexRoute);
app.use('/', authRoute);
app.use('/', cartRoute);
app.use('/', profileRoute);

// Setting view engine to ejs.
// Node.js to look into the folder views for all ejs files
app.set("view engine", "ejs");

mongoose.connect(
  "mongodb://localhost:27017/coffeeapp",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
	if(err){
		console.log(err);
	}
	console.log("Mongodb connected seccessfully!!!");
  }
);

// Listen for HTTP request on PORT 4000
app.listen(PORT, () => {
  console.log(`Running on PORT  ${PORT}`);
});