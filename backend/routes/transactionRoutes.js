import express from "express";
import Transaction from "../models/Transaction.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// Route to create a new transaction
router.post("/", verifyToken, async (req, res) => {
  try {
    const { amount, type, category, description, isRecurring } = req.body;

    if (!amount || !type || !category) {
      return res
        .status(401)
        .json({ message: "Please provide all the required fields!" });
    }

    // Ensure that req.user._id is available
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Invalid or missing user ID!" });
    }

    const transaction = new Transaction({
      userId: req.user.id,
      amount,
      type,
      category,
      description,
      isRecurring,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to read all transactions
router.get("/", verifyToken, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to read single transaction
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to update operation
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedTransaction)
      return res.status(404).json({ message: "Transaction not found" });

    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to delete a transaction
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deleteTransaction = await Transaction.findByIdAndDelete(
      req.params.id
    );
    if (!deleteTransaction)
      return res.status(404).json({ message: "Transaction not found" });
    res.status(200).json(deleteTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
