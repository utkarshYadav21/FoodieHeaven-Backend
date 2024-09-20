const Restaurant = require("../Models/Restaurant");
const Dishes = require("../Models/DishSchema");
const RestCred = require("../Models/RestCred");

module.exports.restaurant_add = async (req, res) => {
  try {
    const { email, cardImage, mainImage, description, location, cuisines } =
      req.body;

    let rest = await RestCred.findOne({ email });
    if (!rest) {
      return res.status(400).json({
        status: "Error",
        message: "Restaurant not found",
      });
    }

    // Find the associated Restaurant using the RestaurntDetails field
    let restaurant = await Restaurant.findById(rest.RestaurntDetails);
    if (!restaurant) {
      return res.status(404).json({
        status: "Error",
        message: "Restaurant details not found",
      });
    }

    // Update the restaurant's fields with the new data from the request
    restaurant.cardImage = cardImage || restaurant.cardImage;
    restaurant.mainImage = mainImage || restaurant.mainImage;
    restaurant.description = description || restaurant.description;
    restaurant.location = location || restaurant.location;
    restaurant.cuisines = cuisines || restaurant.cuisines;

    // Save the updated restaurant
    await restaurant.save();

    // Respond with success and updated restaurant data
    return res.status(200).json({
      status: "Success",
      restaurant: restaurant,
    });
  } catch (err) {
    // Log and handle any errors that occur
    console.log(err.message);
    return res.status(500).json({
      status: "Error",
      message: "Failed to update restaurant details",
      error: err.message,
    });
  }
};

module.exports.add_dish = async (req, res) => {
  try {
    const { resId } = req.params;
    let restaurant = await Restaurant.findById(resId);

    if (!restaurant) {
      return res
        .status(404)
        .json({ status: "Error", message: "Restaurant not found" });
    }

    let dish = new Dishes(req.body);
    dish = await dish.save();
    restaurant.dishes.push(dish._id);
    restaurant = await restaurant.save();

    console.log("Saved Dish:", dish);

    return res.status(200).json({ status: "Success", dish: dish });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: err.message,
    });
  }
};

module.exports.restaurant_get = async (req, res) => {
  try {
    let rests = await RestCred.find();
    let restaurants = [];
    console.log(rests);
    restaurants = await Promise.all(
      rests.map(async (rest) => {
        rest = await rest.populate("RestaurntDetails");
        console.log(rest);
        return rest; // return the populated rest
      })
    );
    console.log("List of all the restaurants", restaurants);

    return res
      .status(200)
      .json({ status: "Success", restaurants: restaurants });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

module.exports.single_restaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    let restaurant = await Restaurant.findById(restaurantId)
      .populate("dishes")
      .populate({
        path: "reviews",
        populate: {
          path: "createdBy", // Populate the 'createdBy' field within each review
        },
      });

    console.log("Restaurant:", restaurant);

    return res.status(200).json({ status: "Success", restaurant: restaurant });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};
