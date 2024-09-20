const express = require("express");
const router = express.Router();
const restaurantController = require("../Controllers/restaurantController");
const authController = require("../Controllers/authController");

router
  .post("/signup", authController.restSignup_post)
  .post("/login", authController.restLogin_post)
  .post("/add", restaurantController.restaurant_add)
  .get("/get", restaurantController.restaurant_get)
  .get("/:id", restaurantController.single_restaurant)
  .post("/addDish/:resId", restaurantController.add_dish);

module.exports = router;
