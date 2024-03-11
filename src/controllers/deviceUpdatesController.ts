import { Request, Response, NextFunction } from "express";
import * as deviceUpdatesService from "../services/deviceUpdateService";

export const getRealTimeData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Implement this method to get the real-time data for a device
  const deviceId = req.params.id;

  /** Just for testing purposes */
  res.status(200).json({
    message: "Real-time data for device " + deviceId,
    production: "300kwH",
    consumption: "200kwH",
    timestamp: new Date(),
  });
};

export const getHistoricalData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const deviceId = req.params.id;
  const { startTime, endTime, timeInterval } = req.body;
  let updates: any = [];

  if (timeInterval === "day") {
    updates = await deviceUpdatesService.getHourlyHistoricalData(
      startTime,
      endTime,
      deviceId
    );
  }

  res.status(200).json({
    message: "Historical data for device " + deviceId,
    startTime: new Date(startTime * 1000),
    endTime: new Date(endTime * 1000),
    timeInterval: timeInterval,
    updates: updates,
  });
};

/** Just for testing purposes */
/*res.status(200).json({
    message: "Historical data for device " + deviceId,
    startTime: new Date(startTime),
    endTime: new Date(endTime),
    timeInterval: timeInterval,
  }); */
// Implement this method to get the historical data for a device
