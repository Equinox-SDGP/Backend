import { Request, Response, NextFunction } from "express";
import * as spaceDataService from "../services/spaceDataService";

export const getSpaceDataList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const spaceData = await spaceDataService.getSpaceAggregatedData();
    res.status(200).send(spaceData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching space data");
  }
};

export const getSpaceInformation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const spaceData = await spaceDataService.getSpaceInformation();
  res.status(200).send(spaceData);
};

export const updateSpaceDataList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Updating space data");
  const spaceData = await spaceDataService.fetchSpaceData();
  try {
    if (spaceData) {
      const result = await spaceDataService.setSpaceData(spaceData);
      res.status(201).json({ message: "Space data updated", result });
    }
    res
      .status(200)
      .json({ message: "No space data found from fusion solar api" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating space data" });
  }
};

export const updateSpaceDataListByTime = async () => {
  console.log("Updating space data by time");
  const spaceData = await spaceDataService.fetchSpaceData();
  try {
    if (spaceData) {
      await spaceDataService.setSpaceData(spaceData);
      console.log("Space data updated");
    }
  } catch (error) {
    console.error("Error updating space data", error);
  }
};
