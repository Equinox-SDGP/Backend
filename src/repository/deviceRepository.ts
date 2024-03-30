import Device from "./models/deviceModel";
import { IDevice } from "./models/deviceModel";

export const addDevice = async (deviceData: IDevice) => {
  const newDevice = new Device(deviceData);
  return newDevice.save();
};

export const getDevices = async () => {
  return Device.find().exec();
};

export const getDeviceById = async (deviceId: number) => {
  return Device.findById(deviceId).exec();
};

