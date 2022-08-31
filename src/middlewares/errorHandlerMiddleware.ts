import { Response, Request, NextFunction} from "express";

interface CustomErrors {
    message: string;
    type: string;
}

export async function errorHandler(error: CustomErrors, req: Request, res: Response, next: NextFunction) {

    if (error.type === "not_found") {
        return res.status(404).send(error.message)
    }

    return res.status(500).send("Internal server error")
}