import { type IUser } from '../models/User.js';
export declare class UserRepository {
    findByUsername(username: string): Promise<IUser | null>;
    createUser(userData: Partial<IUser>): Promise<IUser>;
}
//# sourceMappingURL=user.repository.d.ts.map