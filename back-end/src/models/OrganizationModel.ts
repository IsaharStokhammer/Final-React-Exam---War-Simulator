import mongoose, { Schema, Document, Types } from "mongoose";


export interface IOrganization extends Document {
  name: string;
  resourses: {
    name: string;
    amount: number;
  };
  budget: number;
}
const organizationSchema = new Schema<IOrganization>({
  name: { type: String, required: true },
  resourses: [
    {
      name: { type: String, required: true },
      amount: { type: Number, required: true },
    },
  ],
  budget: { type: Number, required: true },
});
export default mongoose.model<IOrganization>(
  "Organization",
  organizationSchema
);
