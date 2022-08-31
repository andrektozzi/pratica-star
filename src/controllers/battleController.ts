import { Request, Response } from "express";
import { postBattleService } from "../services/battleService.js";

export async function postBattleController(req: Request, res: Response) {
    const {firstUser, secondUser} : {firstUser: string, secondUser: string} = req.body;
    const response = await postBattleService(firstUser, secondUser);
    return res.send(response);
}