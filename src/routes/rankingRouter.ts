import express from "express";
import { getRankingController } from "../controllers/rankingController.js";

const rankingRouter = express()

rankingRouter.get("/ranking", getRankingController)

export default rankingRouter