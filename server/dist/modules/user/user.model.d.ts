import { Document, Model } from 'mongoose';
export interface IUser extends Document {
    fullName: string;
    mobile: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const UserModel: Model<IUser>;
//# sourceMappingURL=user.model.d.ts.map