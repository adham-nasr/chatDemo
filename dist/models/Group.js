import { Schema, model, Document, Types } from 'mongoose';
const GroupSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    members: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    admin: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    createdAt: { type: Date, default: Date.now },
});
export const Group = model('group', GroupSchema, 'group');
//# sourceMappingURL=Group.js.map