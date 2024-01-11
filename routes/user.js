const User = require('../models/User');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../middleware/verifyToken');
const bcrypt = require('bcrypt');
const { updateUser, deleteUser, getSingleUser, getAllUsers } = require('../controller/userController');
const router = require('express').Router();

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, updateUser);

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

//GET A USER BY ID
router.get("/:id", verifyTokenAndAdmin, getSingleUser);


//GET ALL USERS
router.get("/", verifyTokenAndAdmin, getAllUsers);

//GET USER STATS;   This is going to return the total numbe of users per month
router.get("/stats", verifyTokenAndAdmin, async(req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try{
          const data = await User.aggregate([
            {$match: { createdAt: {$gte: lastYear}}},
            {
                $project: {
                    month: {$month: "$createdAt"}
                }
            },
            {
                $group:{
                    _id: "$month",
                    total: {$sum: 1}
                }
            }
          ]);
        res.status(200).json(data)
    }catch(err){
        res.status(500).json(err)
    }
});

module.exports = router;