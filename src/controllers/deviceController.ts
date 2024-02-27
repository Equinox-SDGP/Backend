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

  const existsDevice = await Device.findOne({
    deviceId: deviceData.deviceId,
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
