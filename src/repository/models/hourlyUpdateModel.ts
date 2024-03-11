import mongoose, { Document, Schema } from "mongoose";
import { IDevice } from "./deviceModel";

export interface IHourlyUpdate extends Document {
  _id: mongoose.Types.ObjectId;
  dataItemMap: {
    radiation_intensity: string;
    theory_power: string;
    inverter_power: number;
    ongrid_power: string;
    power_profit: number;
  };
  stationCode: string;
  collectTime: number;
  // Add other hourly update properties as needed
}

const hourlyUpdateSchema: Schema<IHourlyUpdate> = new Schema({
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
      type: String,
      required: true,
    },
    inverter_power: {
      type: Number,
      required: true,
    },
    ongrid_power: {
      type: String,
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
  // Add other hourly update properties as needed
});

const HourlyUpdate = mongoose.model<IHourlyUpdate>(
  "Mockdata",
  hourlyUpdateSchema
);

export default HourlyUpdate;
