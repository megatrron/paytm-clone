const express = require("express");
const { authMiddleware } = require("../middleware");
const { AccountsModel } = require("../db");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const amount = await AccountsModel.findOne({
    userId: userId,
  });
  res.status(200).json({
    balance: amount.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const senderId = req.userId;
    const receiverId = req.body.to;
    const amount = req.body.amount;

    if (!receiverId || !amount || amount <= 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Invalid request" });
    }

    const sender = await AccountsModel.findOne({ userId: senderId }).session(
      session
    );
    const receiver = await AccountsModel.findOne({
      userId: receiverId,
    }).session(session);

    if (!sender || !receiver) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Sender or receiver not found" });
    }

    if (sender.balance < amount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Insufficient Balance" });
    }

    // Update sender and receiver balances
    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save({ session });
    await receiver.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ message: "Transaction successful" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    return res.status(500).json({ message: "Transaction failed" });
  }
});

module.exports = router;

