const express = require("express");
const { z } = require("zod");
const router = express.Router();
const { UserModel, AccountsModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");
const requiredBody = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(3).max(30),
});
const requiredBody2 = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
const randomAmountGenerator = () => {
  return Math.floor(Math.random() * 10000);
};

router.post("/signup", async (req, res) => {
  const safeParsedData = requiredBody.safeParse(req.body);
  if (!safeParsedData.success) {
    return res.status(411).json({ message: "invalid credentials" });
  }

  const { email, password, name } = safeParsedData.data;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(411)
        .json({ message: "user with same email already exists" });
    }

    const user = await UserModel.create({ email, password, name });
    const userId = user._id;

    await AccountsModel.create({
      userId: userId,
      balance: randomAmountGenerator(),
    });

    // const token = jwt.sign(userId.toString(), JWT_SECRET); 
    return res.status(200).json({
      message: "you are signed up",
      // token: token,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "internal server error" });
  }
});

router.post("/signin", async (req, res) => {
  const safeParsedData = requiredBody2.safeParse(req.body);
  if (!safeParsedData.success) {
    res.status(411).json({
      message: "invalid credentials",
    });
    return;
  }
  const user = await UserModel.findOne({
    email: safeParsedData.data.email,
    password: safeParsedData.data.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
    });
    return;
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findOne({ _id: userId }).select("_id name");
    const account = await AccountsModel.findOne({ userId: userId }).select("balance");
    if (!user || !account) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      _id: user._id,
      name: user.name,
      balance: account.balance
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.put("/", authMiddleware, async (req, res) => {
  const userId = req.userId;
  try {
    const result = await UserModel.updateOne({ _id: userId }, { $set: req.body });
  } catch (e) {
    res.status(411).json({
      message: "invalid creds",
    });
    return;
  }
  res.status(200).json({
    message: "user profile updated successfully",
  });
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";

  try {
    const users = await UserModel.find({
      name: { $regex: filter, $options: "i" },
    }).select("name _id");
    res.status(200).json({
      users: users,
    });
    return;
  } catch (error) {
    console.error("Error in /bulk:", error);
    res.status(500).json({
      message: "Internal server error",
    });
    return;
  }
});

module.exports = router;
