import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

// Loading environment variables from .env file
dotenv.config();

// Creating an instance of an express application
const app = express();

// Extablishes connection to MongoDB database
connectDB();

// Enabling cors to specific frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
  })
);

// Middleware to parse incoming requests as JSON
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
