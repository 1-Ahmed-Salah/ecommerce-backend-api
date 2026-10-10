/**
 * @desc Import core and custome modules
 */
import express from "express";

const app = express();

app.use('/health', (req, res)=> {
    res.status(200).json({ message: "ok" });
})

export { app }
