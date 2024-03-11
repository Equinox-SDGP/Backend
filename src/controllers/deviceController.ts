import { Request, Response, NextFunction } from "express";
import * as deviceService from "../services/deviceService";
import Device from "../repository/models/deviceModel";
import { constants } from "buffer";

/**
 * Add a new device to the database
 *
 * @param req
 * @param res
 * @param next
 */

export const addDevice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const deviceData = req.body;
  deviceData._id = deviceData.deviceId;
  delete deviceData["deviceId"];

  const existsDevice = await Device.findOne({
    _id: deviceData._id,
  }).exec();
  if (existsDevice) {
    const e = new Error("Device already exists!");
    return next(e);
  }

  try {
    const device = await deviceService.addDevice(deviceData);
    if (device) {
      res.status(201).json({
        message: "New Device added successfully!",
      });
    } else {
      const e = new Error("Error adding device!");
      return next(e);
    }
  } catch (error) {
    const e = new Error("Error adding device!");
    return next(e);
  }
};

export const getDevices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const devices = await deviceService.getDevices();
    if (devices) {
      res.status(200).json(devices);
    } else {
      const e = new Error("Error fetching devices!");
      return next(e);
    }
  } catch (error) {
    const e = new Error("Error fetching devices!");
    return next(e);
  }
};


export const getDeviceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const deviceId = parseInt(req.params.id);
  try {
    const device = await deviceService.getDeviceById(deviceId);
    if (device) {
      res.status(200).json(device);
    } else {
      const e = new Error("Error fetching device!");
      return next(e);
    }
  } catch (error) {
    const e = new Error("Error fetching device!");
    return next(e);
  }
}
