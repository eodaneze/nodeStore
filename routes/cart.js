const Cart = require('../models/Cart');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../middleware/verifyToken');
const bcrypt = require('bcrypt');
const Product = require('../models/Product');
const { addCart, updateCart, deleteCart, clearCart, getCart } = require('../controller/cartController');
const router = require('express').Router();


//add product to cart
router.post("/add/:userId/:productId",  verifyToken, addCart)

// UPDATE
router.put("/:userId", verifyToken, updateCart);

// DELETE a product in user cart using the product id
router.delete("/:userId/:productId", verifyToken, deleteCart);

// clear the user cart using the user id
router.delete('/clear',verifyToken, clearCart);

// GET USER CART
router.get("/:userId",  verifyToken, getCart);






module.exports = router;