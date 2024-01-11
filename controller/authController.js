
const User = require('../models/User');
const dotenv = require('dotenv')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


dotenv.config();

const secret_key = process.env.JWT_SECRET;
// REGISTER
const authRegister = async(req, res) => {
    const {username, email, password} = req.body;
    //check for empty field;
    if(!username || !email || !password){
        return res.status(400).json({error: 'Please provide all required fields'})
    }
    try{
       // check if username or email is already taken
       const existingUser = await User.findOne({username, email});
       if(existingUser){
          return res.status(400).json({error: 'Username or email already exist'});
       }
       //hash the password
       const hashedPassword = await bcrypt.hash(password, 10);
       // create new user
       const newUser = new User({
          username,
          email,
          password: hashedPassword
       })
       //save the user
       const user = await newUser.save();
       res.status(201).json({message: "Your registration was successful", user})
    }catch(error){
       console.error(error);
     res.status(500).json({ error: 'Internal server error' });
    }
 }

 const authLogin =  async(req, res) => {
    const{username, password} = req.body;
    if(!username || !password){
      return res.status(400).json({ error: 'Please provide both username and password.' })
    }
    try{
      //find the user by username in the database
      const user = await User.findOne({username});
      //check if user exist
      if(!user){
         return res.status(401).json({ error: 'Invalid username or password.' });
      }
       // Compare the provided password with the stored hashed password
       const passwordMatch = await bcrypt.compare(password, user.password);
       if (!passwordMatch) {
         return res.status(401).json({ error: 'Invalid username or password.' });
       }
       
       // Use destructuring with the spread operator to exclude password from the response
       const { password: _, ...others} = user.toObject();
       // use a jwt to authenticate a user
       const accessToken = jwt.sign({
         id: user._id,
         isAdmin: user.isAdmin, 
         username: user.username}, secret_key, {
         expiresIn: '6h',
       });

       res.status(200).json({ message: 'Login successful', others, accessToken});
    }catch(error){
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
}

 module.exports = {authRegister, authLogin}