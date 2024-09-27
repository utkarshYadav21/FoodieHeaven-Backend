const express=require("express");
const router=express.Router();
const favController=require("../Controllers/favController")

router.post("/add",favController.addFavRest);
router.post("/remove",favController.removeFavRest)
router.get("/:userId",favController.getFavRest);

module.exports=router;