const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        user_id: {
             type: mongoose.Schema.Types.ObjectId,
             ref: "User"
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product"
                 },
                 quantity: {type: Number, required: true},
            }
        ]
    },
    {timestamps: true}
);

module.exports = mongoose.model("Cart", cartSchema)