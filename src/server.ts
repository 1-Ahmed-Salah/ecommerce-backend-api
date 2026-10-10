/**
 * @desc    Import core and custome modules
 */
import { createServer } from "node:http";
import { app } from "./app";
import { connectDB } from "./config/db";
import { PORT } from "./secrets";

async function bootstrab() {

    // Connect DB
    await connectDB();

    const server = createServer(app);

    server.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));

    process.on("unhandledRejection", (reason)=> {
        console.log(`Unhandled Rejection: ${reason.message}`);
        server.close(()=> {
            console.log('Server shutting down...');
            process.exit(1);
        })
    })

    process.on("uncaughtException", (error)=> {
        console.log(`Uncaught Exception: ${error.message}`);
        server.close(()=> {
            console.log('Server shutting down...');
            process.exit(1);
        })
    })
}

bootstrab();
