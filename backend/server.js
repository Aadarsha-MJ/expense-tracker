import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";

dotenv.config(); // Loading environment variables from .env file

const app = express(); // Creating an instance of an express application

connectDB(); // Extablishes connection to MongoDB database

app.use(express.json()); // Middleware to parse incoming requests as JSON

app.get("/", (req, res) => {
  res.send("API is running... woohoooo");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
