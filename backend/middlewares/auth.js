import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied!" });

  const finalToken = token.split(" ")[1];
  if (!finalToken) return res.status(401).json({ message: "Access denied!" });
  try {
    const verified = jwt.verify(finalToken, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token!" });
  }
};
