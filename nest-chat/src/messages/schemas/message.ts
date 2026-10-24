import { Schema, model, Document, Types } from 'mongoose';

export interface IMessage extends Document {
  sender: Types.ObjectId;
  group: Types.ObjectId;
  content?: string;
  fileUrl?: string;
  fileType?: string;
  createdAt: Date;
}

export const MessageSchema = new Schema<IMessage>({
  sender: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  group: { type: Schema.Types.ObjectId, ref: 'group', required: true },
  content: { type: String },
  fileUrl: { type: String },
  fileType: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Message = model<IMessage>('message', MessageSchema , 'message');
