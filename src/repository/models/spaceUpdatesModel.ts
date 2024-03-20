import mongoose, { Document, Schema } from "mongoose";

export enum UPDATE_INTERVAL {
  HOUR = "hour",
  DAY = "day",
  MONTH = "month",
  YEAR = "year",
}
export interface IUpdateSpace extends Document {
  dataItemMap: {
    radiation_intensity: string;
    theory_power: number;
    inverter_power: number;
    ongrid_power: number;
    power_profit: number;
  };
  stationCode: string;
  collectTime: number;
  updateInterval: UPDATE_INTERVAL;
}

const hourlyUpdateSchema: Schema<IUpdateSpace> = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  dataItemMap: {
    radiation_intensity: {
      type: String,
      required: true,
    },
    theory_power: {
      type: Number,
      required: true,
    },
    inverter_power: {
      type: Number,
      required: true,
    },
    ongrid_power: {
      type: Number,
      required: true,
    },
    power_profit: {
      type: Number,
      required: true,
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
  "HourlyUpdateSpace",
  hourlyUpdateSchema
);

export default UpdateSpace;