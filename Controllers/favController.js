const User = require("../Models/User");

module.exports.addFavRest = async (req, res) => {
  try {
    const { resId, userId } = req.body;
    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ status: "Error", message: "User not found" });
    }
    user.favRestaurants.push(resId);
    await user.save();
    res.status(200).json({ status: "success", user: user });
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
      error: e.message,
    });
  }
};
module.exports.removeFavRest = async (req, res) => {
  try {
    const { resId, userId } = req.body;
    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ status: "Error", message: "User not found" });
    }

    user.favRestaurants = user.favRestaurants.filter((el) => {
      return el.toString() !== resId;
    });

    await user.save();

    return res.status(200).json({
      status: "Success",
      message: "Restaurant removed from favorites",
      user: user,
    });
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
      error: e.message,
    });
  }
};

module.exports.getFavRest = async (req, res) => {
  try {
    const { userId } = req.params;
    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ status: "Error", message: "User not found" });
    }

    user = await user.populate("favRestaurants");
    let favRests = await Promise.all(
      user.favRestaurants.map(async (rest) => {
        rest = await rest.populate("RestaurntDetails");
        return rest;
      })
    );
    console.log("fav rests",favRests)

    return res.status(200).json({
      status: "Success",
      restaurants: favRests,
    });
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
      error: e.message,
    });
  }
};
