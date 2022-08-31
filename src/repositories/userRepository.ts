import connection from "../config/database.js";

export function postUserRepository(username: string, wins: number, losses: number, draws: number) {
    return connection.query(`
    INSERT INTO fighters (username, wins, losses, draws)
    VALUES ($1, $2, $3, $4) RETURNING id, wins, losses, draws
    `, [username, wins, losses, draws]);
}

export function updateUserRepository(id: number, username: string, wins: number, losses: number, draws: number) {
    return connection.query(`
    UPDATE fighters 
    SET wins=$1, losses=$2, draws=$3
    WHERE id=$4
    `, [wins, losses, draws, id])
}