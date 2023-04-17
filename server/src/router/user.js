import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User.js";


const router = express.Router();


router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const newUser = await UserModel.findOne({ username });

  if (newUser) {
    return res.json({ message: "User already exists!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = UserModel({ username, password: hashedPassword });

  const savedUser = await user.save();

  res.json(savedUser);
});



router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  

    const user = await UserModel.findOne({ username });
  
    if (!user) {
      return res.json({ message: "User doesn't exists!" });
    }
  
    const comparePassword = bcrypt.compare(password, user.password);
  
    if(!comparePassword){
      return res.json({ message: "Wrong Credentials!" });
    }
  
    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id });
  });

export { router as userRouter };