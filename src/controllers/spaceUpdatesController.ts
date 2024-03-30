import moment from "moment";
import { Request, Response, NextFunction } from "express";
import * as spaceUpdatesService from "../services/spaceUpdatesService";
import * as spaceService from "../services/spaceService";

export const getSpaceUpdates = async (req: Request, res: Response) => {
  const spaceId = req.params.id;
  const collectTime = req.body.collectTime;
  const timeInterval = req.body.timeInterval;

  try {
    const spaceData = await spaceUpdatesService.getSpaceUpdates(
      spaceId,
      collectTime,
      timeInterval
    );
    return res.status(200).json(spaceData);
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid time interval") {
      return res.status(400).json({ error: "Invalid time interval" });
    }
    return res.status(500).json({ message: "Error fetching space data" });
  }
};

export const getSpaceUpdatesGraph = async (req: Request, res: Response) => {
  const spaceId = req.params.spaceId as string;
  const collectTime = Number(req.query.collectTime as string);
  const timeInterval = req.query.timeInterval as string;

  try {
    const spaceData = await spaceUpdatesService.getSpaceUpdatesGraph(
      spaceId,
      collectTime,
      timeInterval
    );
    return res.status(200).json(spaceData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching space data" });
  }
};

export const saveSpaceUpdates = async (req: Request, res: Response) => {
  const spaceId = req.body.stationCode;
  const collectTime = req.body.collectTime;
  const timeInterval = req.body.timeInterval;

  try {
    const spaceData = await spaceUpdatesService.saveSpaceUpdates(
      spaceId,
      collectTime,
      timeInterval
    );
    return res.status(201).json(spaceData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error saving space data" });
  }
};

export const hourlySpaceUpdates = async () => {
  try {
    const spaceList = await spaceService.getSpacesIdList();

    spaceList.forEach(async (spaceId) => {
      const currentTime = moment().valueOf();
      await spaceUpdatesService.saveSpaceUpdates(spaceId, currentTime, "day");
      await spaceUpdatesService.saveSpacePrediction(spaceId, currentTime);
    });
    console.log("Updated hourly space data");
  } catch (error) {
    console.log(error);
  }
};

// Daily space updates
export const dailySpaceUpdates = async () => {
  try {
    const spaceList = await spaceService.getSpacesIdList();

    spaceList.forEach(async (spaceId) => {
      const currentTime = moment().valueOf();
      await spaceUpdatesService.saveSpaceUpdates(spaceId, currentTime, "month");
    });
    console.log("Updated daily space data");
  } catch (error) {
    console.log(error);
  }
};


