import express from "express";

 const router = express.Router();

router.get("/", () => console.log("get success"))

export default router;
