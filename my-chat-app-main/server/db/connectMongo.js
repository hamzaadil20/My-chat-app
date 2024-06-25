import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to database", error.message);
  }
};

export default connectToDb;
