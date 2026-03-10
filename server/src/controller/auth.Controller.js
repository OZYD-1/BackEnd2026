import { register } from "../models/auth.Model.js";
import { findUserByEmail, findUserByNationalId } from "../models/user.Model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  const {
    name,
    email,
    national_id,
    phone_number,
    address,
    birth_date,
    gender,
    password,
    nationality,
    has_passport,
    passportId,
    role,
  } = req.body;
  console.log(req.body);
  try {
    if(!name || !email || !national_id || !birth_date || !gender || !password || !nationality ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const isExist = await findUserByEmail(email);
    const isNationalIdExist = await findUserByNationalId(national_id);
    if(isExist) {
      return res.status(400).json({ message: "Email already exists, try logging in" });
    }
    if(isNationalIdExist) {
      return res.status(400).json({ message: "National ID already exists with a different email" });
    }
    if(!['male', 'female'].includes(gender.toLowerCase())) {
      return res.status(400).json({ message: "Gender must be either 'male' or 'female'" });
    }
    if(has_passport && !passportId) {
      return res.status(400).json({ message: "if you have a passport, please enter a passport ID" });
    }
    const hashed_password = bcrypt.hash(password, 10);
    const user = await register(
      name,
      email,
      national_id,
      phone_number,
      address,
      birth_date,
      gender,
      hashed_password,
      nationality,
      has_passport,
      passportId,
      role,
    );
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginController = async (req, res) => {
  // login logic here
  const { email, password } = req.body;
  try {
    if(!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const isExist = await findUserByEmail(email);
    if(!isExist) {
      return res.status(400).json({ message: "Dont have an account , please register" });
    }
    const isMatch = await bcrypt.compare(password, isExist.hashed_password);
    if(!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // generate token logic here
    const token = jwt.sign({ id: isExist._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ message: "Login successful", user: isExist, token: token });
  }

  catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}