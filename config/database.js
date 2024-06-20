import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  if (connected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    mongoose.connect("strictQuery", true);
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    connected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
