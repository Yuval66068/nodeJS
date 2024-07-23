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
    console.log(user)
    if (!user) throw Error("User does not exist");

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) throw Error("Incorrect password");

    const token = jwt.sign({ _id: user._id, isBusiness: user.isBusiness, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({message: "user logged in successfully", token});
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
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  const user = req.body;
  try {
    const newUser = await User.create(user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export const toggleisBuisness = async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
