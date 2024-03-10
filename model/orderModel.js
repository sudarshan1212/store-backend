const mongoose = require("mongoose");
const orderSchema = mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "Users" },
    productId: { type: String, require: true, ref: "Products" },
    prodcutName: { type: String, require: true, ref: "Products" },
    quantity: { type: Number, require: true, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
