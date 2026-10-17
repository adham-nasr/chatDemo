import { Schema, model, Document, Types } from 'mongoose';

export interface IGroup extends Document {
  name: string;
  description?: string;
  members: Types.ObjectId[];
  admin: Types.ObjectId;
  createdAt: Date;
}

const GroupSchema = new Schema<IGroup>({
  name: { type: String, required: true },
  description: { type: String },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Group = model<IGroup>('Group', GroupSchema);
