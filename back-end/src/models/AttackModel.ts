import mongoose from "mongoose";

export interface IAttack {
  attackerUserName: string;
  direction: string;
  timeToHit_in_sec: number;
  status:  "Launched" | "Hit" | "Intercepted";
}

const attackSchema = new mongoose.Schema<IAttack>({
  attackerUserName: { type: String},
  direction: { type: String},
  timeToHit_in_sec: { type: Number},
  status: {type: String, enum: ["Launched", "Hit", "Intercepted"]},
});

export default mongoose.model<IAttack>("Attack", attackSchema);
