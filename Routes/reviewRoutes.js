const express=require("express");
const router=express.Router();
const reviewController=require("../Controllers/reviewController")

router.post("/post/:resId",reviewController.review_post);
// router.get("/get",reviewController.review_get)

module.exports=router;