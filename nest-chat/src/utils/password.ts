import bcrypt from 'bcrypt';
import { config } from '../config';
export const hashPasssword = async (password:string)=>{
    const saltRounds = parseInt(config.saltRounds);
    return await bcrypt.hash(password,saltRounds);
}

export const verifyPassword = async (password:string,hashedPassword:string) => {
    return await bcrypt.compare(password,hashedPassword)
}

