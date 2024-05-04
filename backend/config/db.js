import mongoose from "mongoose";

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/todo";

console.log("MONGO_URI : ", MONGO_URI);

export const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true); // remove unknown properties/field from the query

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to db");
    });

    mongoose.connection.on("error", (err) => {
      console.log("Mongoose connection error: ", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disconnected");
    });

    process.on("SIGINT", () => {
      // Close Mongoose connection
      mongoose.connection.close(() => {
        console.log("Mongo connection closed");
        process.exit(0);
      });
    });
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
    process.exit(1);
  }
};
