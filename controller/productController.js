const bcrypt = require('bcrypt');
const multer = require('multer');
const Product = require('../models/Product');

const addProduct = async(req, res) => {
    try{
     const {title, desc, category, size, color, price} = req.body;
     //checking if an image was uploaded alongside the product
     const file = req.file;
     if(!file) return res.status(500).json({message: "Please upload an image"});
     const fileName = req.file.filename; // multer provides the filename
      const basePath = `${req.protocol}://${req.get('host')}/public/upload/`
     // create a new product
     const newProduct = new Product({
        title,
        desc,
        category,
        size,
        color,
        price,
        img: `${basePath}${fileName}`
     });

     // save the product to db
     const saveProduct = await newProduct.save();
     
    res.status(201).json({ message: 'Product added successfully', saveProduct});
    }catch(err){
       console.log(err);
       res.status(500).json({ message: 'Internal Server Error' });
    }
}

const updateProduct = async(req, res) => {
    
    try{
     const id = req.params.id;
     const {title, desc, category, size, color, price} = req.body;
     const fileName = req.file.filename; // multer provides the filename
     const basePath = `${req.protocol}://${req.get('host')}/public/upload/`
     
        const updatedProduct = await Product.findByIdAndUpdate(id, {
            title,
            desc,
            category,
            size,
            color,
            price,
            img: `${basePath}${fileName}`
        }, { new: true })

        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
         
   res.status(200).json(updatedProduct)
    }catch(err){
        res.status(500).json(err)
    }
}


const deleteProduct = async(req, res) => {
    try{
       await Product.findByIdAndDelete(req.params.id);
       res.status(200).json("Product have been deleted")
    }catch(error){
         res.status(500).json(error)
    }
}

const getSingleProduct = async(req, res) => {
    try{
      const product = await Product.findById(req.params.id);
       res.status(200).json(product)
    }catch(error){
         res.status(500).json(error)
    }
}

const getAllProducts = async(req, res) => {
    // creating a url query to return a particular number of products
    const qNew = req.query.new;
    const qCategory = req.query.category;
   try{
     let products;
     if(qNew){
        products = await Product.find().sort({createdAt: -1}).limit(2)
     }else if(qCategory){
        products = await Product.find({categories:{
           $in: [qCategory],
        }})
     }else{
        products = await Product.find();
     }
      res.status(200).json(products)
   }catch(error){
        res.status(500).json(error)
   }
}
module.exports = {addProduct, updateProduct, deleteProduct, getSingleProduct, getAllProducts}