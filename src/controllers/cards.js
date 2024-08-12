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

export const getUserCards = async (req, res) => {
  const {_id} = req.user;

  try {
  const cards = await Card.find({userId: _id})
    res.status(200).json({ message: "my cards fetched successfully", cards });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createCard = async (req, res) => {
  const {_id, isBusiness, isAdmin} = req.user;
  if(!isBusiness && !isAdmin) return res.status(401).json({ message: "Unauthorized access, business or admin only" });
  try {
    const newCard = await Card.create({...req.body,userId:_id});
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
  const {_id, isAdmin} = req.user;
  if (!id) return res.status(404).json({ message: "id not valid" });

  try {

    const card = await Card.findById(id);
    if(!card) return res.status(404).json({ message: "card not found" });
  if(!isAdmin && _id !== card.userId) return res.status(401).json({ message: "Unauthorized access, same user or admin only" });


    const deletedCard = await Card.findByIdAndDelete(id);
    if (!deletedCard) return res.status(404).json({ message: "card not found" });
    const cards = await Card.find();
    res.status(200).json({ message: "card deleted successfully", card, cards });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const editCardById = async (req, res) => {
  const { id } = req.params;
  const {_id} = req.user;
  if (!id) return res.status(404).json({ message: "card not found" });
  
  try {
    const card = await Card.findById(id);
    if(!card) return res.status(404).json({ message: "card not found" });
    if(_id !== card.userId) return res.status(401).json({ message: "Unauthorized access, same user only" });

    const cardEdited = await Card.findByIdAndUpdate(id, req.body, { new: true });
    if(!cardEdited) return res.status(404).json({ message: "card not found" });
    const cards = await Card.find();
    res.status(200).json({ message: "card updated successfully", card, cards });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const toggleLike = async (req, res) => {
  const { id } = req.params;
  const {_id} = req.user;
  if (!id) return res.status(404).json({ message: "card not found" }); 
 
  try {
    const card = await Card.findById(id);
    if(!card) return res.status(404).json({ message: "card not found" });

    const isLiked = card.likes.includes(_id);
    const updatedCard = await Card.findByIdAndUpdate(id, isLiked ? { $pull: { likes: _id } } : { $push: { likes: _id } },{new:true});
    res.status(200).json({ message: "card updated successfully", card: updatedCard });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
