import mongoose, { Schema, models } from "mongoose";

const adminSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
});

const admin = models.Admin || mongoose.model("Admin", adminSchema);

export default admin;
