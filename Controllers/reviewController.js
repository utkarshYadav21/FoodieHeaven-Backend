const Restaurant = require("../Models/Restaurant");
const Review = require("../Models/Review");

module.exports.review_post = async (req, res) => {
  try {
    const { resId } = req.params;
    let restaurant = await Restaurant.findById(resId);

    if (!restaurant) {
      return res
        .status(404)
        .json({ status: "Error", message: "Restaurant not found" });
    }

    let review = new Review(req.body);
    review = await review.save();
    restaurant.reviews.push(review._id);
    restaurant = await restaurant.save();

    console.log("Saved Review:", review);

    return res.status(200).json({ status: "Success", review: review });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      error: err.message,
    });  }
};

// module.exports.review_get = async (req, res) => {
//   try {
//     let reviews = [];
//     reviews = await Review.find();
//     console.log("List of Reviews:", reviews);
//     res.status(200).json({ status: "Success", reviews: reviews });
//   } catch (err) {
//     console.log(err.message);
//   }
// };
