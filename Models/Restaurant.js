const mongoose = require("mongoose");

const RestaurantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cardImage: {
    type: String,
    required: true,
  },
  mainImage: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
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
    required: true,
  },
  cuisines: [
    {
      type: String,
    },
  ],
  resType:{
    type:String,
    required:true
  }
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;
