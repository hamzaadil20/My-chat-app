import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenandSetCookie from "../utils/generateToken.js";

export const signUpUser = async (req, res) => {
  try {
    // Take the schema fields from the database
    const { fullName, username, password, confirmPassword, gender } = req.body;

    // Check if all fields were field
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Verify if password and confirmPassword are same
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    // To verify a unique username
    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // To hash the password
    const cryptSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, cryptSalt);

    // To obtain an avatar prof pic
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // To create a new data and save to the database
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      // Utility function to generate jwt token
      generateTokenandSetCookie(newUser._id, res);
      await newUser.save();

      // HTTP Success Response
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    // HTTP Internal Server Error Response
    console.log("Error in sign up controller:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    generateTokenandSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    // HTTP Internal Server Error Response
    console.log("Error in login up controller:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const logoutUser = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
