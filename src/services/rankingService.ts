import { getRankingRepository } from "../repositories/rankingRepository.js";


export async function getRankingService() {
    const { rows } = await getRankingRepository()

    if(rows.length !== 0) {
        return rows
    } else {
        throw {type: "not_found", message: "empty list"}
    }
}