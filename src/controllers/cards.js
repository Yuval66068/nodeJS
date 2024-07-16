import { Card } from "../db/models/cardModel.js";

export const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json({ message: "cards fetched successfully", cards });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCardById = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(404).json({ message: "card not found" });
  try {
    const card = await Card.findById(id);
    res.status(200).json({ message: "card fetched successfully", card });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createCard = async (req, res) => {
  try {
    const newCard = await Card.create(req.body);
    const cards = await Card.find();
    res
      .status(201)
      .json({ message: "card created successfully", newCard, cards });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCardById = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(404).json({ message: "card not found" });
  try {
    const card = await Card.findByIdAndDelete(id);
    const cards = await Card.find();
    res.status(200).json({ message: "card deleted successfully", card, cards });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const editCardById = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(404).json({ message: "card not found" });
  try {
    const card = await Card.findByIdAndUpdate(id, req.body, { new: true });
    const cards = await Card.find();
    res.status(200).json({ message: "card updated successfully", card, cards });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
