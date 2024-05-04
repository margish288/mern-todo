import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";
import { setupRoute } from "./routes/index.js";

dotenv.config(); // set up environment variables

const app = express();
const PORT = process.env.PORT || 8000;

//middlewares
app.use(express.json());
app.use(cors());

setupRoute(app);

// Connect to MongoDB
connectDB().then(() => {
  // Start the server when connected to the database
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
