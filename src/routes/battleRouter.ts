import express from "express";
import { postBattleController } from "../controllers/battleController.js";

const battleRouter = express.Router();

battleRouter.post("/battle", postBattleController)

export default battleRouter