import express from "express";
import { createCard, deleteCardById, editCardById, getAllCards, getCardById, getUserCards, toggleLike } from "../controllers/cards.js";
import { requireAuth } from "../middlewares/requireAuth.js";

 export const cardsRouter = express.Router();

 cardsRouter.get("/", getAllCards);//all
 cardsRouter.get("/my-cards",requireAuth,getUserCards);//user only
 cardsRouter.get("/:id", getCardById);//all
 cardsRouter.post("/",requireAuth ,createCard);
 cardsRouter.put("/:id",requireAuth,editCardById);
 cardsRouter.delete("/:id",requireAuth,deleteCardById);//user or admin
 cardsRouter.patch("/:id",requireAuth, toggleLike);//toggle like
