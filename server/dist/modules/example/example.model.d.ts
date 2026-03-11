import mongoose, { Document, Model } from 'mongoose';
export interface IExample extends Document {
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}
export type ExamplePlain = {
    _id: mongoose.Types.ObjectId;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
};
export declare const ExampleModel: Model<IExample>;
//# sourceMappingURL=example.model.d.ts.map