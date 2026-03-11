import mongoose, { Schema, Document, Model, Types } from 'mongoose';

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

const bboxSchema = new Schema<IBbox>(
  {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  { _id: false }
);

const jobSchema = new Schema<IJob>(
  {
    videoId: { type: Schema.Types.ObjectId, ref: 'Video', required: true },
    bbox: { type: bboxSchema, required: true },
    ratio: { type: String, required: true },
    status: { type: String, enum: ['queued', 'processing', 'completed', 'failed'], default: 'queued' },
    outputPath: { type: String },
  },
  { timestamps: true }
);

export const JobModel: Model<IJob> =
  mongoose.models.Job ?? mongoose.model<IJob>('Job', jobSchema);
