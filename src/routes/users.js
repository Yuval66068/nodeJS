import express from "express";
import { deleteUser, editUser, getUserById, getUsers, loginUser, registerUser, toggleisBuisness } from "../controllers/users.js";
import { requireAdminAuth } from "../middlewares/requireAdminAuth.js";
import { requireAuth } from "../middlewares/requireAuth.js";

 export const usersRouter = express.Router();

 usersRouter.post("/", registerUser);
 usersRouter.post("/login", loginUser);
 usersRouter.get("/",requireAdminAuth, getUsers);//admin only
 usersRouter.get("/:id",requireAuth, getUserById);//admin + user
 usersRouter.put("/:id",requireAuth, editUser);//only user
 usersRouter.patch("/:id",requireAuth, toggleisBuisness);//only user
 usersRouter.delete("/:id",requireAuth, deleteUser);//admin + user
