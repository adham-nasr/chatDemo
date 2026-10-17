import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/ping', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "pong" });
});

// Accumulated errors
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: "Internal Server Error" });
});

export default app;
