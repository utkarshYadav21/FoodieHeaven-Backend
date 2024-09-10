const express = require("express");
const router = express.Router();
const cartController = require("../Controllers/cartController");

router.post("/add",cartController.cartAddItem)
router.get("/:userId",cartController.getCart)
router.patch("/:userId/:dishId", cartController.editCart);
router.delete("/:userId/:dishId",cartController.delCartItem)

module.exports = router;
