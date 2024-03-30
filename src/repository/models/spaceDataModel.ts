import { Schema, model } from "mongoose";

export interface ISpaceData {
  stationCode: string;
  dataItemMap: {
    total_income: number;
    total_power: number;
    day_power: number;
    day_income: number;
    real_health_state: number;
    month_power: number;
  };
}

const spaceDataSchema = new Schema(
  {
    stationCode: { type: String, required: true },
    dataItemMap: {
      total_income: { type: Number, required: true },
      total_power: { type: Number, required: true },
      day_power: { type: Number, required: true },
      day_income: { type: Number, required: true },
      real_health_state: { type: Number, required: true },
      month_power: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

const spaceDataModel = model<ISpaceData>("SpaceData", spaceDataSchema);
export default spaceDataModel;
