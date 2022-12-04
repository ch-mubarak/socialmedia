import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "your not authorized" });
  }
  try {
    const user =jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "your not authorized" });
  }
};

export default authenticate;
