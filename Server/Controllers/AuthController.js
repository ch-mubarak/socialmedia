import User from "../Models/userModal.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  const { email, username, password, firstName, lastName } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      firstName,
      lastName,
    });
    await newUser.save();
    newUser.password = undefined;
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credential" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      user.password = undefined;
      return res.status(200).json(user);
    } else {
      res.status(400).json({ message: "Invalid credential" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
