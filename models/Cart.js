const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  
  productId: {
        type: mongoose.Schema.Types.ObjectId
  },

  name: String,
  price: Number,
  img: String,
  description: { type: String },

  totalQun: {
    type: Number,
    default: 1,
    required: true,
  },
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
});

module.exports = mongoose.model("Cart", cartSchema);