import express from "express";
import { createCard, deleteCardById, editCardById, getAllCards, getCardById } from "../controllers/cards.js";

 export const cardsRouter = express.Router();

 cardsRouter.get("/", getAllCards);
 cardsRouter.get("/:id", getCardById);
 cardsRouter.post("/", createCard);
 cardsRouter.delete("/:id",deleteCardById);
 cardsRouter.put("/:id",editCardById);