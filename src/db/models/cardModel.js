import mongoose from "mongoose";
import { cardSchema } from "../schmas/cardSchema.js";

export const Card = mongoose.model("Card", cardSchema);