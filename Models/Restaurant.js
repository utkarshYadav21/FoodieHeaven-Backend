const mongoose = require("mongoose");

const RestaurantSchema = mongoose.Schema({
  cardImage: {
    type: String,
  },
  mainImage: {
    type: String,
  },
  description: {
    type: String,
  },
  dishes: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Dishes', // Reference to the Dishes model
  }],
  reviews:[{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Review', // Reference to the review model
  }],
  location: {
    type: String,
  },
  cuisines: [
    {
      type: String,
    },
  ],
  resType:{
    type:String,
  }
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;
