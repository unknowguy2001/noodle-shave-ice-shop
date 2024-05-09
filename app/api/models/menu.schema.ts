import mongoose, { Schema, Types, models } from "mongoose";
import Topping from "./topping.schema"; //! don't forget to import 

const menuSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, requried: true },
  toppings: [{ type: Types.ObjectId, ref: Topping }],
  price: { type: Number, required: true },
  description: { type: String, required: true },
});

const Menu = models.Menu || mongoose.model("Menu", menuSchema);

export default Menu;
