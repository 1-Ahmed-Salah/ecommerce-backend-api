/**
 * @desc    Import Core and third party modules
 */
import express from "express";
/**
 * @desc    Custom modules and middlewares
 */

/**
 * Routes
 */
import AuthRouter from "./routes/auth.route";

const app = express();

// Global middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/health', (req, res)=> {
    res.status(200).json({ message: "ok" });
})

app.use('/api/v1/auth', AuthRouter);

export { app };
