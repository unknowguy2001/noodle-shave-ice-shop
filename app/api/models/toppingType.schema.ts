import mongoose, { Schema, models } from "mongoose";

const toppingType = new Schema({
  name: { type: String, require: true },
});

const ToppingType =
  models.ToppingType || mongoose.model("ToppingType", toppingType);

export default ToppingType;
