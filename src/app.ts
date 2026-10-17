import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import authRoutes from "./routes/auth.routes.js";
import groupRoutes from "./routes/group.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/ping', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "pong" });
});

app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/upload', uploadRoutes);

// Accumulated errors
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: "Internal Server Error" });
});

export default app;
