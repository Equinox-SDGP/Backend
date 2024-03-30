import { Document, Schema, model } from "mongoose";

export interface IDevice extends Document {
  _id: number;
  deviceName: string;
  deviceDescription: string;
  longitude: number;
  latitude: number;
  deviceType: number;
  inverterBrand: string; // Only Applicable for inverter devices
  inverterType: string; // Only Applicable for inverter devices
  softwareVersion: string;
}

const deviceSchema = new Schema(
  {
    _id: { type: Number, required: true },
    deviceName: { type: String, required: true },
    deviceDescription: { type: String, required: false },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    deviceType: { type: Number, required: true },
    inverterBrand: { type: String, required: false },
    inverterType: { type: String, required: false },
    softwareVersion: { type: String, required: true },
  },
  { timestamps: true }
);

const Device = model<IDevice>("Device", deviceSchema);

export default Device;
