import { getFighter } from "../repositories/battleRepository.js";
import axios from "axios";
import { postUserRepository, updateUserRepository } from "../repositories/userRepository.js";

interface Users {
    id: number;
    username: string;
    wins: number;
    losses: number;
    draws: number;
}

async function getUser(username: string) {

    const { rows } = await getFighter(username)

    if (!rows[0]) {
        const repos = await postUserRepository(username, 0, 0, 0)
        return repos.rows[0]
    }

    return rows[0]
}

async function getUserGitHub(username: string) {
    const { data } = await axios.get(
        `https://api.github.com/users/${username}/repos`
    );

    return data;
}