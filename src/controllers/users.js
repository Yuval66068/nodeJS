import { User } from "../db/models/userModel.js";
import { userSchema } from "../db/validations/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const registerUser = async (req, res) => {
  const userFormData = req.body;
  try {
    await userSchema.validateAsync(userFormData);
    const isEmailExist = await User.findOne({ email: userFormData.email });
    if (isEmailExist) throw Error("Email already exists");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(userFormData.password, salt);

    const newUser = await User.create({ ...userFormData, password: hash });
    res.status(201).json({ message: "user registered successfully", newUser });
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw Error("All fields must be filled");

  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) throw Error("User does not exist");

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) throw Error("Incorrect password");

    const token = jwt.sign(
      { _id: user._id, isBusiness: user.isBusiness, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "3h",
      }
    );

    res.status(200).json({ message: "user logged in successfully", token });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const {_id, isAdmin} = req.user;

  console.log(isAdmin,_id)

  if(!isAdmin && _id !== id)return  res.status(401).json({ message: "Unauthorized access, admin or same user only" });

  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const editUser = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const userId = req.user._id;

  try {
    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (existingUser._id.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this user" });
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export const toggleisBuisness = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {

    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (existingUser._id.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this user" });
    }


    const updatedUser = await User.findByIdAndUpdate(id, { isBusiness: !existingUser.isBusiness}, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const {_id,isAdmin} = req.user;

  if(!isAdmin && _id !== id)return  res.status(401).json({ message: "Unauthorized access, admin or same user only" });

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) throw Error("User does not exist");
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
