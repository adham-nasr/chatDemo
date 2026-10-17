import { verifyToken } from '../utils/jwt.js';
export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('Incoming Authorization Header:', authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication token missing or malformed' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = verifyToken(token || "");
        req.user = payload;
        next();
    }
    catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
//# sourceMappingURL=auth.middleware.js.map