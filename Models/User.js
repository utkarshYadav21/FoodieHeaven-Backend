const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    validate: [validator.isEmail, " Please provide a valid email "],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  favRestaurants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  ],
  cart:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Cart"
  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); //run only if password is modified
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordconfirm = undefined; //deleting this so that it is not set in database
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("users", userSchema);

module.exports = User;
