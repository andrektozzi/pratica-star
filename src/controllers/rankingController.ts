import { Request, Response } from "express";
import { getRankingService } from "../services/rankingService.js";

export async function getRankingController(req: Request, res: Response){
    const respo = await getRankingService()
    return res.send({fighters: respo})
}