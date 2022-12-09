import User from "../Models/userModal.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Post from "../Models/postModal.js";

export const registerUser = async (req, res) => {
  const { email, username, password, firstName, lastName } = req.body;
  if (!(email && username && password && firstName && lastName)) {
    return res.status(401).json({ message: "all filed are required" });
  }
  try {
    const isUserExist = await User.findOne({ username });
    if (isUserExist) {
      return res
        .status(401)
        .json({ message: "This username is already exist" });
    }
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return res.status(401).json({ message: "this email is already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      email,
      username,
      password: hashedPassword,
      firstName,
      lastName,
    });
    await user.save();
    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    user.password = undefined;
    const options = {
      expires: new Date(Date.now() + 60 * 60 * 1000),
      httpOnly: true,
      secure: false,
    };
    res.status(201).cookie("token", token, options).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!(username && password)) {
    return res.status(401).json({ message: "all filed are required" });
  }
  try {
    const user = await User.findOne({ username }).lean();
    if (!user) {
      return res.status(400).json({ message: "Invalid credential" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid credential" });
    }
    const totalPosts = await Post.find({ userId: user._id }).countDocuments();
    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
        userId: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    //cookie section
    const options = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: false,
    };
    user.totalPosts = totalPosts;
    user.password = undefined;
    res.status(200).cookie("token", token, options).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
