import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IVideo extends Document {
  title?: string;
  description?: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  uploadedBy: Types.ObjectId;
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
  createdAt: Date;
  updatedAt: Date;
};

const videoSchema = new Schema<IVideo>(
  {
    title: { type: String },
    description: { type: String },
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileSize: { type: Number, required: true },
    mimeType: { type: String, required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const VideoModel: Model<IVideo> =
  mongoose.models.Video ?? mongoose.model<IVideo>('Video', videoSchema);
