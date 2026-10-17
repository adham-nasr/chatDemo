import { Schema, model, Document } from 'mongoose';
const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
export const User = model('user', UserSchema, 'user');
//# sourceMappingURL=User.js.map