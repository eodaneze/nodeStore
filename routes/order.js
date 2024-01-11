const { verifyToken } = require('../middleware/verifyToken');
const Cart = require('../models/Cart');
const Order = require('../models/Order');


const router = require('express').Router();

 // place order
 router.post('/place/:userId', verifyToken, async(req, res) => {
   try{
      const {userId} = req.params;
    //   find the users cart
    const userCart = await Cart.findOne({user_id:userId});
    if(!userCart || userCart.items.length === 0) return res.status(400).json({message: 'User\s cart is empty. Cannot place order'});
    // calculate the total amount of the order that was made by the user
    const calculatedAmount = userCart.items.reduce((total, item) => {
        const productPrice = item.product.price;
        const itemTotal = productPrice * item.quantity;
        console.log(`Product Price: ${productPrice}, Item Total: ${itemTotal}`);
        return total + itemTotal;
        
    }, 0);
      console.log(`Calculated Amount: ${calculatedAmount}`)
    // create a new order with a default satus of pending
    try{
        
        const newOrder = new Order({
             user_id: userId,
             items: userCart.items,
             totalAmount: calculatedAmount,
        });
        await newOrder.save();
        res.json({ message: 'Order placed successfully', order: newOrder });
    }catch(err){
        //  console.log(err);
         res.status(500).json({message: "Order validation failed", err})
    }
    // clear the cart once the user have placed an order
    await Cart.findOneAndDelete({ user_id: userId });

} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });

}
 })
module.exports = router;