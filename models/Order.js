const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        items: [
            {
              product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
              quantity: {type: Number, required: true},
            },
          ],

          totalAmount: { type: Number, required: true },
          orderDate: { type: Date, default: Date.now },
          status: { type: String, default: 'pending' },
    }
);

module.exports = mongoose.model("Order", orderSchema)