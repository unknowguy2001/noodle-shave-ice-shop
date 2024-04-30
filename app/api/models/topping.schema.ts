import mongoose, { Schema, models } from "mongoose";

const toppingSchema = new Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  price: { type: Number },
});

const Topping = models.Topping || mongoose.model("Topping", toppingSchema);

export default Topping;
