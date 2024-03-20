import { Document, model, Schema } from "mongoose";

export interface IFusionSession extends Document {
  token: string;
  createdAt: Date;
}

const fusionSessionSchema = new Schema(
  {
    token: { type: String, required: true },
  },
  { timestamps: true }
);

const FusionSession = model<IFusionSession>(
  "FusionSession",
  fusionSessionSchema
);
export default FusionSession;
