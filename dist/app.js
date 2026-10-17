import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import authRoutes from "./routes/auth.routes.js";
import groupRoutes from "./routes/group.routes.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/ping', (req, res, next) => {
    res.status(200).json({ message: "pong" });
});
app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
// Accumulated errors
app.use((error, req, res, next) => {
    res.status(500).json({ message: "Internal Server Error" });
});
export default app;
//# sourceMappingURL=app.js.map