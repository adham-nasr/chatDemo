import { Document, Types } from 'mongoose';
export interface IGroup extends Document {
    name: string;
    description?: string;
    members: Types.ObjectId[];
    admin: Types.ObjectId;
    createdAt: Date;
}
export declare const Group: import("mongoose").Model<IGroup, {}, {}, {}, Document<unknown, {}, IGroup, {}, import("mongoose").DefaultSchemaOptions> & IGroup & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IGroup & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
//# sourceMappingURL=Group.d.ts.map