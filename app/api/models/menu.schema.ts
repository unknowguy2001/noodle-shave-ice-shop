import mongoose, { Schema, Types, models } from "mongoose";

const menuSchema = new Schema({
  name: { type: String, required: true },
  image: {type: String, requried: true},
  toppings: [{ type: Types.ObjectId, ref: "Topping", required: true }],
  price: { type: Number, required: true },
  description: { type: String, required: true },
});

const Menu = models.Menu || mongoose.model("Menu", menuSchema);

export default Menu;
