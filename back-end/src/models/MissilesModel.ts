import mongoose, { Schema, Document, Types } from "mongoose";
export interface IMissiles extends Document {
  name: string;
  description: string;
  speed: number;
  intercepts: string[];
  price: number;
}

const MissilesSchema = new Schema<IMissiles>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  speed: { type: Number, required: true },
  intercepts: { type: [String], required: true },
  price: { type: Number, required: true },
});
export default mongoose.model<IMissiles>("Missiles", MissilesSchema);
