import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { usermodel } from "../Models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await usermodel.findOne({ username });

  if (user) {
    return res.json({ message: "User already exist" });
  }

  const hashedpassword = await bcrypt.hash(password, 10);

  //adding user to the database
  const newuser = new usermodel({ username, password: hashedpassword });
  await newuser.save();

  res.json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await usermodel.findOne({ username });
  
  if (!user) {
    return res.json({ message: "User don't exist" });
  }

  const ispasswordvalid = await bcrypt.compare(password, user.password)

  if (!ispasswordvalid) {
    return res.json({message: "The password is incorrect"})
  }

  const token = jwt.sign({id:user._id},"secret")
  res.json({token, userID: user._id})
});

export { router as userRouter };
