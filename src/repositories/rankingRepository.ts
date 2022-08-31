import connection from "../config/database.js";

export function getRankingRepository() {
    return connection.query(`
    SELECT * 
    FROM fighters 
    ORDER BY wins DESC, draws DESC
    `)
}