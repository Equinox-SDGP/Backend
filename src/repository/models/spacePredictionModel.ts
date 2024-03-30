import mongoose, { Document, Schema } from "mongoose";
import { IDataItemMap } from "./spaceUpdatesModel";

export type IPrediction = {
  clear_sky: {
    dni: number;
  };
  temp: number;
  power: number;
  prediction_power: number;
  state: string;
};

export type ISpacePrediction = {
  stationCode: string;
  collectTime: number;
  updateInterval: string;
  prediction: IPrediction;
};

const spacePredictionSchema: Schema<ISpacePrediction> = new Schema({
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
  prediction: {
    clear_sky: {
      dni: {
        type: Number,
        required: true,
      },
    },
    temp: {
      type: Number,
      required: true,
    },
    power: {
      type: Number,
      required: true,
    },
    prediction_power: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
});

const SpacePrediction = mongoose.model<ISpacePrediction>("SpacePrediction", spacePredictionSchema);
export default SpacePrediction;