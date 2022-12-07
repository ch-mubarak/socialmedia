import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "your not authorized", expired: true });
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "jwt expired") {
      return res.status(401).json({ message: "token expired", expired: true });
    }
    console.log(error.message);
    return res.status(401).json({ message: "your not authorized" });
  }
};

export default authenticate;
