import express, {Application} from "express";
import { globalErrorHandler } from "../errors/errorHandler";
import healthRoutes from "../routes/health.routes"

const app:Application = express();

app.use(express.json());

app.use("/api/vi", healthRoutes);

app.use(globalErrorHandler);

export default app;