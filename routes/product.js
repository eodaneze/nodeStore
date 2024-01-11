const Product = require('../models/Product');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../middleware/verifyToken');
const bcrypt = require('bcrypt');
const { addProduct, updateProduct, deleteProduct, getSingleProduct, getAllProducts } = require('../controller/productController');
const uploadOptions = require('../middleware/multerConfig');
const router = require('express').Router();





//CREATE PRODUCT with image uplaod
router.post("/create", verifyTokenAndAdmin, uploadOptions.single('img'), addProduct)

// UPDATE
router.put("/:id", verifyTokenAndAdmin, uploadOptions.single('img'), updateProduct);

// DELETE
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);

// GET A product BY ID
router.get("/:id", getSingleProduct);


//GET ALL Products
router.get("/", getAllProducts);



module.exports = router;