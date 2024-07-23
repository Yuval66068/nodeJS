import express from "express";
import { loginUser, registerUser } from "../controllers/users.js";

 export const usersRouter = express.Router();

 usersRouter.post("/", registerUser);
 usersRouter.post("/login", loginUser);
 usersRouter.get("/", () => {});//get all users
 usersRouter.get("/:id", () => {});//get user by id
 usersRouter.put("/:id", () => {});//edit user by id
 usersRouter.patch("/:id", () => {});//toggle is buisness
 usersRouter.delete("/:id", () => {});//delete user
