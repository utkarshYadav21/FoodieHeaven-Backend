const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const RestCredSchema = mongoose.Schema({
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
    select: false,
  },
  RestaurntDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
});

RestCredSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Password comparison method
RestCredSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const RestCred = mongoose.model("restCreds", RestCredSchema);

module.exports = RestCred;
