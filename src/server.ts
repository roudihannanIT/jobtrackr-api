import app from "./app/app";
import { env } from "./config/env";
import { connectDB } from "./database/connectDB";

const startServer = async () => {
    await connectDB();

    app.listen(env.PORT, () => {
        console.log(`Server running on port ${env.PORT}`)
    }); 
};

startServer();