const dishSchema = require("./DishSchema");

const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  dishes: [
    {
      dish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dishes", // Reference to the Dishes model
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
