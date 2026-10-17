import { User, type IUser } from '../models/User.js';

export class UserRepository {
  async findByUsername(username: string): Promise<IUser | null> {
    return await User.findOne({ username });
  }

  async createUser(userData: Partial<IUser>): Promise<IUser> {
    return await User.create(userData);
  }
}
