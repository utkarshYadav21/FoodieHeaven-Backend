const mongoose = require("mongoose");
const Cart = require("../Models/Cart");
const User = require("../Models/User");

module.exports.cartAddItem = async (req, res) => {
  const { userId, resId, dishes } = req.body;

  let user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({ status: "Error", message: "User not found" });
  }
  user = await user.populate("cart");

  let cart = await Cart.findById(user.cart._id);
  if (!cart) {
    return res.status(400).json({ status: "Error", message: "Cart not found" });
  }

  cart.dishes = [...cart.dishes, ...dishes]; // Assuming 'dishes' is an array of { dish, quantity }
  cart.restaurant = resId;

  cart = await cart.save();

  //   cart = await Cart.findById(cart._id).populate("restaurant").populate("dishes.dish");
  //   console.log(cart);

  return res.status(200).json({ status: "Success", cart: cart });
};

module.exports.getCart = async (req, res) => {
  const { userId } = req.params;

  let user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({ status: "Error", message: "User not found" });
  }

  const cartId = user.cart;
  let cart = await Cart.findById(cartId)
    .populate("restaurant")
    .populate("dishes.dish");
  if (!cart) {
    return res.status(400).json({ status: "Error", message: "Cart not found" });
  }

  return res.status(200).json({ status: "Success", cart: cart });
};

module.exports.editCart = async (req, res) => {
  const { dishId, userId } = req.params;
  const { quant } = req.body;

  try {
    // Check if user exists
    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ status: "Error", message: "User not found" });
    }

    // Retrieve the user's cart
    const cartId = user.cart;
    let cart = await Cart.findById(cartId);
    if (!cart) {
      return res
        .status(400)
        .json({ status: "Error", message: "Cart not found" });
    }

    // Update the dish quantity in the cart
    let dishUpdated = false;
    cart.dishes.forEach((el) => {
      if (el.dish.toString() === dishId) {
        el.quantity = quant;
        dishUpdated = true;
      }
    });

    if (!dishUpdated) {
      return res
        .status(404)
        .json({ status: "Error", message: "Dish not found in cart" });
    }

    // Save the updated cart
    await cart.save();
    return res
      .status(200)
      .json({ status: "Success", message: "Cart updated", cart });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "Error", message: "Internal server error" });
  }
};

module.exports.delCartItem = async (req, res) => {
  const { dishId, userId } = req.params;

  let user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({ status: "Error", message: "User not found" });
  }

  const cartId = user.cart;
  let cart = await Cart.findById(cartId);
  if (!cart) {
    return res.status(400).json({ status: "Error", message: "Cart not found" });
  }

  let newDishes = cart.dishes.filter((el) => {
    let objId = new mongoose.Types.ObjectId(el.dish).toString();
    return objId !== dishId;
  });

  cart.dishes = [...newDishes];
  await cart.save();

  return res.status(200).json({ status: "Success", message: "Cart Updated" });
};
