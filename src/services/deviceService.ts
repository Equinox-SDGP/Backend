import Logger from "js-logger";
import { IDevice } from "../repository/models/deviceModel";
import * as Device from "../repository/deviceRepository"; // Make sure to adjust the import path based on your project structure

const mongoose = require("mongoose");

export const addDevice = async (deviceData: IDevice) => {
  return new Promise((resolve, reject) => {
    // Assuming you want to set some default values or perform additional operations before saving
    
    // It is essential to add the _id field to the deviceId from Huawei
    Device.addDevice(deviceData)
      .then((device) => {
        resolve(device);
      })
      .catch((error: Error) => {
        Logger.error("Error adding device:", error);
        reject(new Error("Error adding device to the database"));
      });
  });
};

export const getDevices = async () => {
  return new Promise((resolve, reject) => {
    Device.getDevices()
      .then((devices) => {
        resolve(devices);
      })
      .catch((error: Error) => {
        Logger.error("Error fetching devices:", error);
        reject(new Error("Error fetching devices from the database"));
      });
  });
}

export const getDeviceById = async (deviceId: number) => {
  return new Promise((resolve, reject) => {
    Device.getDeviceById(deviceId)
      .then((device) => {
        resolve(device);

        if (!device) {
          reject(new Error("Device not found"));
        }
      })
      .catch((error: Error) => {
        Logger.error("Error fetching device:", error);
        reject(new Error("Error fetching device from the database"));
      });
  });
}
