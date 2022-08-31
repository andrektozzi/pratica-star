import express from "express";
import battleRouter from "./battleRouter.js";
import rankingRouter from "./rankingRouter.js";

const router = express.Router()

router.use(battleRouter)
router.use(rankingRouter)

export default router