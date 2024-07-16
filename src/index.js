import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import chalk from "chalk";
import {cardsRouter} from "./routes/cards.js";
import { connectDB } from "./db/db.js";

const app = express();
dotenv.config();

const port = process.env.PORT;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/cards", cardsRouter);

app.listen(port,() => console.log(chalk.bgBlue.bold(`server is running on http://localhost:${port}`)));

connectDB();