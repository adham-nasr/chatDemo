import jwt from "jsonwebtoken";
import { config } from "../config.js";
const JWT_SECRET = config.jwtSecret;
export const generateToken = (userInfo) => {
    return jwt.sign(userInfo, JWT_SECRET, { expiresIn: "9d" });
};
export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};
//# sourceMappingURL=jwt.js.map