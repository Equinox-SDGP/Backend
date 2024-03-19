import { Request, Response, NextFunction } from "express";
import * as spaceUpdatesService from "../services/spaceUpdatesService";

export const spaceUpdates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const spaceId = req.params.id;
  const { startTime, endTime, timeInterval } = req.body;
  try {
    const spaceData = await spaceUpdatesService.spaceUpdates(
      spaceId,
      startTime,
      endTime,
      timeInterval
    );
    res.status(200).json(spaceData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching space data" });
  }
};
