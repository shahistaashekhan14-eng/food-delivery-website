import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const token = req.header("authorization");
  console.log("Token:", token);

  if (!token) {
    return res.json({ success: false, message: "Not Authorised Login Again" });
  }

  try {
    const token_decode = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    console.log("Token decoded:", token_decode);
    req.user = token_decode; // ✅ This is the key line
    next();
  } catch (error) {
    console.log("Token verification error:", error);
    res.json({ success: false, message: "Error" });
  }
};

export default authMiddleware;