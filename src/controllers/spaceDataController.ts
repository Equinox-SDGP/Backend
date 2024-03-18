import { Response, Request, NextFunction } from "express";
import * as spaceDataService from "../services/spaceDataService"

export const getHourlySpaceData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const spaceData = await spaceDataService.getSpaceData();
    res.status(200).send(spaceData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching space data");
  }
};
