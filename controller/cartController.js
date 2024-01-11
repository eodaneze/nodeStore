const Cart = require('../models/Cart');
const bcrypt = require('bcrypt');
const Product = require('../models/Product');

const addCart = async(req, res) => {
    try{
        const {userId, productId} = req.params;
       //  check if the product exist in product table
       const product = await Product.findById(productId);
       if(!product) return res.status(404).json({message: "Product not found"});
       // check if the user has a cart, create one if not
       let cart = await Cart.findOne({user_id: userId});
       if(!cart){
          cart = new Cart({
              user_id: userId,
              items: []
          });
          await cart.save();
       }
       // add the product to the cart
       const exisitingItem = cart.items.find((item) => item.product.equals(productId));
       if(exisitingItem){
          // if the product already exist in cart, increment the quantity
          exisitingItem.quantity++
       }else{
          // if the product is not in the cart, add it with the quantity of 1
          cart.items.push({product: productId, quantity: 1});
       }
       // Save the updated cart
          await cart.save();
          res.json(cart)
       
    }catch(err){
       console.log(err)
       res.status(500).json({ message: 'Internal Server Error' });
    }
 }

 const updateCart = async(req, res) => {
    
    try{
        const {userId} = req.params;
        const updatedCart = req.body; // to send the updated cart to the body

      //   check if the user has a cart
      const cart = await Cart.findOne({user_id: userId});
      if(!cart) return res.status(404).json({message: "Your Cart is empty"})
      // update the cart item
      cart.items = updatedCart.items;
      // save the updated cart
      const saveCart = await cart.save();
       res.status(200).json({message: "cart have been updated successfully", saveCart})
    }catch(error){
          console.error(error);
         res.status(500).json({ message: 'Internal Server Error' })
    }
}

const deleteCart = async(req, res) => {
    try{
        const {userId, productId} = req.params;
      // Find the user's cart
       const userCart = await Cart.findOne({ user_id: userId });
      if(!userCart) return res.status(404).json({message: "Cart not found for the user"})
      // remove the specified product from the users cart
      userCart.items = userCart.items.filter(item => !item.product.equals(productId))
       // Save the updated cart
       await userCart.save();
       res.json({ message: 'Product deleted from user\'s cart successfully', userCart });
    }catch(error){
          console.error(error);
         res.status(500).json({ message: 'Internal Server Error' })
    }
}

const clearCart = async (req, res) => {
    try {
      // Retrieve user IDs before clearing carts
      const usersBeforeClear = await Cart.distinct('user_id');
  
      // Clear all users' carts
      await Cart.deleteMany({});
  
      res.json({ message: 'All carts cleared successfully', usersBeforeClear });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  const getCart = async(req, res) => {
    try{
        const {userId} = req.params;
        const userCarts = await Cart.find({user_id: userId});
        if(userCarts.length == 0) return res.status(404).json({ message: 'Cart is empty for the user' });
        res.json(userCarts);
    }catch(error){
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
}
 module.exports = {addCart, updateCart, deleteCart, clearCart, getCart}