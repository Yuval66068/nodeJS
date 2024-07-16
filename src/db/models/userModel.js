import mongoose from "mongoose";
import { userSchema } from "../schmas/userSchema.js";

export const User = mongoose.model("User", userSchema);