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

async function getStars(repos) {
    let stars: number = 0;

    repos.forEach((repo) => {
        stars += repo.stargazers_count
    });

    return stars;
}

export async function postBattleService(firstUser: string, secondUser: string) {

    const getFirstFighterRepository = await getUserGitHub(firstUser);
    const getSecondFighterRepository = await getUserGitHub(secondUser);

    const getFirstFighter: Users = await getUser(firstUser);
    const getSecondFighter: Users = await getUser(secondUser);
    console.log(getFirstFighter, getSecondFighter)

    const firstFighterStars = await getStars(getFirstFighterRepository);
    const secondFighterStars = await getStars(getSecondFighterRepository);
    if (firstFighterStars > secondFighterStars) {
        console.log("bloco 1")
        await updateUserRepository(
            getFirstFighter.id,
            firstUser,
            (Number(getFirstFighter.wins) + 1),
            Number(getFirstFighter.losses),
            Number(getFirstFighter.draws)
        )
        await updateUserRepository(
            getSecondFighter.id,
            secondUser,
            Number(getSecondFighter.wins),
            (Number(getSecondFighter.losses) + 1),
            Number(getSecondFighter.draws)
        )

        return {
            winner: firstUser, 
            loser: secondUser, 
            draw: false

        }

    } else if (secondFighterStars > firstFighterStars) {
        console.log("bloco 2")
        await updateUserRepository(
            getFirstFighter.id,
            firstUser,
            Number(getFirstFighter.wins),
            (Number(getFirstFighter.losses) + 1),
            Number(getFirstFighter.draws)
        )
        await updateUserRepository(
            getSecondFighter.id,
            secondUser,
            (Number(getSecondFighter.wins) + 1),
            Number(getSecondFighter.losses),
            Number(getSecondFighter.draws)
        )

        return {
            winner: secondUser, 
            loser: firstUser, 
            draw: false 
        }

    } else {
        console.log("bloco 3")
        await updateUserRepository(
            getFirstFighter.id,
            firstUser,
            Number(getFirstFighter.wins),
            Number(getFirstFighter.losses),
            (Number(getFirstFighter.draws) + 1)
        )
        await updateUserRepository(
            getSecondFighter.id,
            secondUser,
            Number(getSecondFighter.wins),
            Number(getSecondFighter.losses),
            (Number(getSecondFighter.draws) + 1)
        )

        return {
            winner: null,
            loser: null,
            draw: true 
        }
    }


}