import Device from "./models/deviceModel";
import { IDevice } from "./models/deviceModel";

export const addDevice = async (deviceData: IDevice) => {
  const newDevice = new Device(deviceData);
  return newDevice.save();
};


