import Logger from "js-logger";
import { IDevice } from "../database/models/deviceModel";
import * as Device from "../database/device"; // Make sure to adjust the import path based on your project structure

const mongoose = require("mongoose");

export const addDevice = async (deviceData: IDevice) => {
  return new Promise((resolve, reject) => {
    // Assuming you want to set some default values or perform additional operations before saving
    deviceData["_id"] = new mongoose.Types.ObjectId();

    Device.addDevice(deviceData)
      .then((device) => {
        resolve(device);
      })
      .catch((error) => {
        Logger.error("Error adding device:", error);
        reject(new Error("Error adding device to the database"));
      });
  });
};


