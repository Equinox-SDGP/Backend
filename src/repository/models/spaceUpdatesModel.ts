import mongoose, { Document, Schema } from "mongoose";

export enum UPDATE_INTERVAL {
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
  YEAR = "year",
}
export interface IUpdateSpace extends Document {
  dataItemMap: {
    radiation_intensity: string | null;
    theory_power: number | null;
    inverter_power: number | null;
    ongrid_power: number | null;
    power_profit: number | null;
  };
  stationCode: string;
  collectTime: number;
  updateInterval: UPDATE_INTERVAL;
}

const spaceUpdateSchema: Schema<IUpdateSpace> = new Schema({
  dataItemMap: {
    radiation_intensity: {
      type: String,
      required: false,
    },
    theory_power: {
      type: Number,
      required: false,
    },
    inverter_power: {
      type: Number,
      required: false,
    },
    ongrid_power: {
      type: Number,
      required: false,
    },
    power_profit: {
      type: Number,
      required: false,
    },
  },
  stationCode: {
    type: String,
    required: true,
  },
  collectTime: {
    type: Number,
    required: true,
  },
  updateInterval: {
    type: String,
    required: true,
  },
});

const UpdateSpace = mongoose.model<IUpdateSpace>(
  "SpaceUpdate",
  spaceUpdateSchema
);

export default UpdateSpace;
