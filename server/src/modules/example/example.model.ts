import mongoose, { Schema, Document, Model } from 'mongoose';

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

const exampleSchema = new Schema<IExample>(
  {
    name: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export const ExampleModel: Model<IExample> =
  mongoose.models.Example ?? mongoose.model<IExample>('Example', exampleSchema);
