import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "No token provided. Unauthorized access" });
    }
    const decrypt = jwt.verify(token, process.env.JWT_SECRET);

    if (!decrypt) {
      return res
        .status(401)
        .json({ error: "Invalid token. Unauthorized access" });
    }

    const user = await User.findById(decrypt.userId).select("-password");

    if (!user) {
      return res.status(401).json({ error: "User Not Found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error at the protectRoute middleware:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
