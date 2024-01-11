const express = require("express");
const app = express();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const authProduct = require("./routes/product");
const authCart = require("./routes/cart");
const authOrder = require("./routes/order");
require('./config/db.js')

const port = process.env.PORT || 8000

app.use(express.json())


app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/products', authProduct);
app.use('/api/carts', authCart);
app.use('/api/order', authOrder);
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})
