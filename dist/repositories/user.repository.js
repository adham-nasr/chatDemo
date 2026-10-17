import { User } from '../models/User.js';
export class UserRepository {
    async findByUsername(username) {
        return await User.findOne({ username });
    }
    async createUser(userData) {
        return await User.create(userData);
    }
}
//# sourceMappingURL=user.repository.js.map