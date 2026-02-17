import express, {Application} from "express";
import { globalErrorHandler } from "../errors/errorHandler";
import healthRoutes from "../routes/health.routes";
import authRoutes from "../routes/auth.routes";
import userRoutes from "../routes/user.routes";
import { errorMiddleware } from "../middlewares/error.middleware";
import adminRoutes from "../routes/admin.routes";

const app:Application = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/vi", healthRoutes);
app.use("/api/admin", adminRoutes);

app.use(globalErrorHandler);

app.use(errorMiddleware);

export default app;