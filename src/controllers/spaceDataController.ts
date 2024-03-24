import { Request, Response, NextFunction } from "express";
import * as spaceDataService from "../services/spaceDataService";

// GET METHODS
export const getSpaceDataList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const spaceData = await spaceDataService.getSpaceAggregatedData();
    return res.status(200).send(spaceData);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error fetching space data");
  }
};

export const getSpaceInformation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const spaceData = await spaceDataService.getSpaceInformation();
  return res.status(200).send(spaceData);
};

// POST METHODS
export const updateSpaceDataList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Updating space data");
    const spaceData = await spaceDataService.fetchSpaceData();

    if (spaceData !== undefined) {
      const result = await spaceDataService.setSpaceData(spaceData);
      return res.status(201).json({ message: "Space data updated", result });
    }
    return res
      .status(404)
      .json({ message: "No space data found from fusion solar api" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating space data" });
  }
};

// TIMELY UPDATES
/**
 * Update space data list by time
 */
export const updateSpaceDataListByTime = async () => {
  console.log("Updating space data by time");
  const spaceData = await spaceDataService.fetchSpaceData();
  try {
    if (spaceData !== undefined) {
      await spaceDataService.setSpaceData(spaceData);
      console.log("Space data updated");
    }
  } catch (error) {
    console.error("Error updating space data", error);
  }
};
