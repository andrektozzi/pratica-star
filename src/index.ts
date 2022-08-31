import express, { json } from "express";
import "express-async-errors";
import dotenv from "dotenv"
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandlerMiddleware.js";
import router from "./routes/indexRouter.js";
dotenv.config()

const index = express();
index.use(json());
index.use(cors());
index.use(router);
index.use(errorHandler);

const port = process.env.PORT || 4000;
index.listen(port, () => console.log(`The server ir running on port ${port}`))