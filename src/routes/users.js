import express from "express";

 export const usersRouter = express.Router();

 usersRouter.post("/", () => {});//register user
 usersRouter.post("/login", () => {});//login user
 usersRouter.get("/", () => {});//get all users
 usersRouter.get("/:id", () => {});//get user by id
 usersRouter.put("/:id", () => {});//edit user by id
 usersRouter.patch("/:id", () => {});//toggle is buisness
 usersRouter.delete("/:id", () => {});//delete user
