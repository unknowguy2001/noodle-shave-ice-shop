import mongoose, { Schema, Types, models } from "mongoose";
import Menu from "./menu.schema";
import Topping from "./topping.schema";

const orderSchema = new Schema({
  orderNumber: { type: String, required: true },
  customerName: { type: String, required: true },
  menus: [
    {
      menu: { type: Types.ObjectId, ref: Menu },
      toppings: [{ type: Types.ObjectId, ref: Topping }],
    },
  ],
  status: { type: Boolean, default: false },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Order = models.Order || mongoose.model("Order", orderSchema);

export default Order;
