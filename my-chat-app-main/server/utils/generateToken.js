import jwt from "jsonwebtoken";

const generateTokenandSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "5h",
  });

  res.cookie("jwt", token, {
    maxAge: 5 * 60 * 60 * 1000, // 5hours to milliseconds
    httpOnly: true, // prevent XSS attacks or cross-site scripting attacks
    sameSite: "strict", // prevent attacks request from forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateTokenandSetCookie;
