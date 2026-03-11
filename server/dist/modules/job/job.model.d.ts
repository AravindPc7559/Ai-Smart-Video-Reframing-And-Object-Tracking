import { Document, Model, Types } from 'mongoose';
export interface IBbox {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface IJob extends Document {
    videoId: Types.ObjectId;
    bbox: IBbox;
    ratio: string;
    status: 'queued' | 'processing' | 'completed' | 'failed';
    outputPath?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const JobModel: Model<IJob>;
//# sourceMappingURL=job.model.d.ts.map