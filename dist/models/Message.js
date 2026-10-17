import { Schema, model, Document, Types } from 'mongoose';
const MessageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    group: { type: Schema.Types.ObjectId, ref: 'group', required: true },
    content: { type: String },
    fileUrl: { type: String },
    fileType: { type: String },
    createdAt: { type: Date, default: Date.now },
});
export const Message = model('message', MessageSchema, 'message');
//# sourceMappingURL=Message.js.map