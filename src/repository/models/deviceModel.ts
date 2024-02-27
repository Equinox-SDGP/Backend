import { Document, Schema, model } from "mongoose";

export type DeviceType = {
  _id: string;
  deviceId: string;
  deviceName: string;
  deviceDescription: string;
};

export interface IDevice extends Document {
  deviceId: string;
  deviceName: string;
  deviceDescription: string;
}

const deviceSchema = new Schema({
  _id: Schema.Types.ObjectId,
  deviceId: { type: String, required: true, unique: true },
  deviceName: { type: String, required: true },
  deviceDescription: { type: String, required: true },
});

const Device = model<IDevice>('Device', deviceSchema);

export default Device;