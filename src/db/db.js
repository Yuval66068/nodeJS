import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.LOCAL_MONGOOSE_URI);
    console.log(chalk.bgBlue.bold(`MongoDB Connected`));
  } catch (error) {
    console.error(chalk.bgRed.bold(`Error: ${error.message}`));
  }
};
