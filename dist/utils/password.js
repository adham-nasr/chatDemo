import bcrypt from 'bcrypt';
import { config } from '../config.js';
export const hashPasssword = async (password) => {
    const saltRounds = parseInt(config.saltRounds);
    return await bcrypt.hash(password, saltRounds);
};
export const verifyPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};
//# sourceMappingURL=password.js.map