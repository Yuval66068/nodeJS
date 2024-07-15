import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk";
import cardsRoutes from "./routes/cards.js";

const app = express();
dotenv.config();

const port = process.env.PORT;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/cards", cardsRoutes);

app.listen(port,() => console.log(`server is running on http://localhost:${port}`));


mongoose.connect("mongodb+srv://avishai2015T:avishai2015T@nodejs.algyfpq.mongodb.net/")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
