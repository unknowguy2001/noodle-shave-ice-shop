import mongoose from "mongoose";

export async function createConnection() {
  try {
    const connection = await mongoose.connect(process.env.DB_URI!);

    if (connection) console.log("Connected database");
  } catch (error) {
    console.log("Error while connecting database: " + error);
  }
}
