import * as spaceUpdatesRepository from "../repository/spaceUpdateRepository";
import { UPDATE_INTERVAL } from "../repository/models/spaceUpdatesModel";
import {
  getHourSpaceUpdatesFromFusion,
  getDaySpaceUpdatesFromFusion,
  getMonthSpaceUpdatesFromFusion,
  getYearSpaceUpdatesFromFusion,
} from "./fusionUpdateService";

export const getSpaceUpdates = async (
  spaceId: string,
  startTime: number,
  endTime: number,
  timeInterval: string
) => {};

export const saveSpaceUpdates = async (
  spaceId: string,
  startTime: number,
  endTime: number,
  timeInterval: string
) => {
  const updatesFromDatabase = await spaceUpdatesRepository.getSpaceUpdates(
    spaceId,
    startTime,
    endTime,
    timeInterval
  );
  

  if (timeInterval === UPDATE_INTERVAL.HOUR) {
  }
  if (timeInterval === UPDATE_INTERVAL.DAY) {
  }
  if (timeInterval === UPDATE_INTERVAL.MONTH) {
  }
  if (timeInterval === UPDATE_INTERVAL.YEAR) {
  }
};
