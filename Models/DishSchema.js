const mongoose=require("mongoose")

const DishSchema = mongoose.Schema({
  image:{
    type:String,
    required:true
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Dishes = mongoose.model("Dishes", DishSchema);
module.exports = Dishes;

