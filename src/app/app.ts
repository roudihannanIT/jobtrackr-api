import express, {Application} from "express";
import { globalErrorHandler } from "../errors/errorHandler";

const app:Application = express();

app.use(express.json());

app.get("/health", (_req, res) => {
    res.status(200).json({status: "OK"});
});

app.use(globalErrorHandler);

export default app;