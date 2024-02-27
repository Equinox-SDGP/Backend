import Logger from "js-logger";
import { IDevice } from "../repository/models/deviceModel";
import * as Device from "../repository/device"; // Make sure to adjust the import path based on your project structure

const mongoose = require("mongoose");

export const addDevice = async (deviceData: IDevice) => {
  return new Promise((resolve, reject) => {
    // Assuming you want to set some default values or perform additional operations before saving
    deviceData["_id"] = new mongoose.Types.ObjectId();

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
