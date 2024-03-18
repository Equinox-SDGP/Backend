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

export const updateSpaceDataList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const spaceData = await spaceDataService.fetchSpaceData();
  
  if (spaceData) {
    await spaceDataService.setSpaceData(spaceData);
    res.status(201).send("Space data updated");
  }
  res.status(200).send("No space data found from fusion solar api");  
};
