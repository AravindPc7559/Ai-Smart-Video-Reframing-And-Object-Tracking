import { Document, Model, Types } from 'mongoose';
export interface IVideo extends Document {
    title?: string;
    description?: string;
    fileName: string;
    fileUrl: string;
    fileSize: number;
    mimeType: string;
    uploadedBy: Types.ObjectId;
    storagePath?: string;
    duration?: number;
    resolution?: string;
    status?: string;
    processedVideo?: string;
    createdAt: Date;
    updatedAt: Date;
}
export type VideoPlain = {
    _id: Types.ObjectId;
    title?: string;
    description?: string;
    fileName: string;
    fileUrl: string;
    fileSize: number;
    mimeType: string;
    uploadedBy: Types.ObjectId;
    storagePath?: string;
    duration?: number;
    resolution?: string;
    status?: string;
    processedVideo?: string;
    createdAt: Date;
    updatedAt: Date;
};
export declare const VideoModel: Model<IVideo>;
//# sourceMappingURL=video.model.d.ts.map