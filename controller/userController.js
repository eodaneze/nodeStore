const User = require('../models/User');
const bcrypt = require('bcrypt');

const updateUser = async(req, res) => {
    if(req.body.password){
       req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
           $set: req.body
        }, {new: true});
   res.status(200).json(updatedUser)
    }catch(err){
        res.status(500).json(err)
    }
}

const deleteUser = async(req, res) => {
    try{
       await User.findByIdAndDelete(req.params.id);
       res.status(200).json("User have been deleted")
    }catch(error){
         res.status(500).json(error)
    }
}

const getSingleUser = async(req, res) => {
    try{
      const user = await User.findById(req.params.id);
      const { password: _, ...others} = user.toObject();
       res.status(200).json(others)
    }catch(error){
         res.status(500).json(error)
    }
}

const getAllUsers = async(req, res) => {
    // creating a url query to return a particular number of users
    const query = req.query.new;
   try{
     const users = query ? await User.find().sort({_id: -1}).limit(5) : await User.find(req.params.id);
   //   const { password: _, ...others} = user.toObject();
      res.status(200).json(users)
   }catch(error){
        res.status(500).json(error)
   }
}
module.exports = {updateUser, deleteUser, getSingleUser, getAllUsers}