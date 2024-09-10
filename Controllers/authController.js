const Cart = require("../Models/Cart");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");

const maxAge = 30 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "Foodie_Heaven", { expiresIn: maxAge });
};

module.exports.signup_post = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        status: "failed",
        message: "User already exists",
      });
    }

    user = new User(req.body);
    const cart = new Cart({
      userId: req.body.email,
    });
    await cart.save();
    user.cart = cart._id;
    await user.save();

    const token = createToken(user._id);
    return res.status(201).json({
      status: "success",
      user: user,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Registration failed",
      error: err.message,
    });
  }
};

module.exports.login_post = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (
      user &&
      (await user.correctPassword(req.body.password, user.password))
    ) {
      const token = createToken(user._id);
      return res.status(200).json({
        status: "success",
        user: user,
        token,
      });
    } else {
      return res.status(401).json({
        status: "failed",
        message: "Invalid email or password",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Login failed",
      error: err.message,
    });
  }
};
module.exports.update_post = async (req, res) => {
  const { email, newEmail, newName } = req.body;

  try {
    // Find the user by email
    let user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .json({ status: "Error", message: "User not found" });
    }

    // Update the user's information
    user.email = newEmail || user.email; // Update email if provided
    user.name = newName || user.name; // Update name if provided

    // Save the updated user
    await user.save();

    return res
      .status(200)
      .json({
        status: "Success",
        message: "User updated successfully",
        user: user,
      });
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ status: "failed", message: "An unexpected error occurred" });
  }
};
