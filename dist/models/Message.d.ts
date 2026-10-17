import { Document, Types } from 'mongoose';
export interface IMessage extends Document {
    sender: Types.ObjectId;
    group: Types.ObjectId;
    content?: string;
    fileUrl?: string;
    fileType?: string;
    createdAt: Date;
}
export declare const Message: import("mongoose").Model<IMessage, {}, {}, {}, Document<unknown, {}, IMessage, {}, import("mongoose").DefaultSchemaOptions> & IMessage & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IMessage & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
//# sourceMappingURL=Message.d.ts.map