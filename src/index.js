import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk";

const app = express();
dotenv.config();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.listen(8080,() => console.log(`server is running on http://localhost:8080`));
