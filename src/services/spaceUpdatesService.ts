const moment = require("moment");

import { IUpdateSpace } from "../repository/models/spaceUpdatesModel";
import * as spaceUpdatesRepository from "../repository/spaceUpdateRepository";
import { UPDATE_INTERVAL } from "../repository/models/spaceUpdatesModel";
import {
  IFusionUpdateHourly,
  getHourSpaceUpdatesFromFusion,
  getDaySpaceUpdatesFromFusion,
  getMonthSpaceUpdatesFromFusion,
  getYearSpaceUpdatesFromFusion,
} from "./fusionSpaceUpdateService";

import {
  convertToGraphDataDay,
  convertToGraphDataMonth,
  convertToGraphDataWeek,
  convertToGraphDataYear,
} from "./spaceGraphService";
import { time } from "console";

/** READ FUNCTIONS */
export const getSpaceUpdatesGraph = async (
  spaceId: string,
  collectTime: number,
  timeInterval: string
) => {
  console.log(spaceId, collectTime, timeInterval);
  const [startTime, endTime] = await timeDuration(collectTime, timeInterval);
  const updatesFromDatabase = await spaceUpdatesRepository.getSpaceUpdates(
    spaceId,
    startTime,
    endTime,
    timeInterval
  );
  console.log(updatesFromDatabase);

  if (updatesFromDatabase.length === 0) {
    const newModifiedUpdates = await saveSpaceUpdates(spaceId, collectTime, timeInterval);
  }

  if (timeInterval === UPDATE_INTERVAL.DAY) {
    return await convertToGraphDataDay(updatesFromDatabase);
  } else if (timeInterval === UPDATE_INTERVAL.WEEK) {
    const dailyUpdate = await getDaySpaceUpdatesFromFusion(
      spaceId,
      collectTime
    );
    return await convertToGraphDataWeek(updatesFromDatabase);
  } else if (timeInterval === UPDATE_INTERVAL.MONTH) {
    const dailyUpdate = await getDaySpaceUpdatesFromFusion(
      spaceId,
      collectTime
    );
    return await convertToGraphDataMonth(updatesFromDatabase);
  } else if (timeInterval === UPDATE_INTERVAL.YEAR) {
    const monthlyUpdate = await getMonthSpaceUpdatesFromFusion(
      spaceId,
      collectTime
    );
    return await convertToGraphDataYear(updatesFromDatabase);
  }
};

export const getSpaceUpdates = async (
  spaceId: string,
  collectTime: number,
  timeInterval: string
) => {
  const [startTime, endTime] = await timeDuration(collectTime, timeInterval);
  const updatesFromDatabase = await spaceUpdatesRepository.getSpaceUpdates(
    spaceId,
    startTime,
    endTime,
    timeIntervalMapper(timeInterval)
  );

  return updatesFromDatabase;
};

/** This function fetches space updates
 *
 *  - If the space updates are not found in the database, it fetches the updates from the Fusion Solar API and saves them to the database.
 *  - then a new request is made to the database to get the space updates.
 *  - then the updates are returned
 *
 * @param spaceId
 * @param collectTime
 * @param timeInterval
 * @returns
 */
export const saveSpaceUpdates = async (
  spaceId: string,
  collectTime: number,
  timeInterval: string
) => {
  // Start and end of day
  const [startTime, endTime] = await timeDuration(collectTime, timeInterval);

  // Get space updates from the database
  const updatesFromDatabase = await spaceUpdatesRepository.getSpaceUpdates(
    spaceId,
    startTime,
    endTime,
    await timeIntervalMapper(timeInterval)
  );

  // Determine the fetch time based on the latest collect time from the database
  let fetchTime = startTime;
  updatesFromDatabase.forEach((element: IUpdateSpace) => {
    fetchTime = Math.max(fetchTime, element.collectTime);
  });

  // Fetch updates from the Fusion Solar API based on the specified time interval
  let updatesFromFusion = [];
  try {
    switch (timeInterval) {
      case UPDATE_INTERVAL.DAY:
        updatesFromFusion = await getHourSpaceUpdatesFromFusion(
          spaceId,
          fetchTime
        );
        break;
      case UPDATE_INTERVAL.WEEK:
        updatesFromFusion = await getDaySpaceUpdatesFromFusion(
          spaceId,
          fetchTime
        );
        break;
      case UPDATE_INTERVAL.MONTH:
        updatesFromFusion = await getMonthSpaceUpdatesFromFusion(
          spaceId,
          fetchTime
        );
        break;
      case UPDATE_INTERVAL.YEAR:
        updatesFromFusion = await getYearSpaceUpdatesFromFusion(
          spaceId,
          fetchTime
        );
        break;
      default:
        throw new Error("Invalid time interval");
    }
  } catch (error) {
    console.error("Error fetching space updates from Fusion Solar API:", error);
    throw new Error("Error fetching space updates from Fusion Solar API");
  }

  // If no updates are found in the database, return the updates from Fusion Solar API
  if (updatesFromFusion === undefined) return updatesFromDatabase;

  // Transform and filter Fusion Solar updates and save them to the database
  const updatesToSaveArray: IUpdateSpace[] = await Promise.all(
    updatesFromFusion.data
      .filter((element: IFusionUpdateHourly) => element.collectTime > fetchTime)
      .map((element: IFusionUpdateHourly) => ({
        dataItemMap: {
          radiation_intensity: element.dataItemMap.radiation_intensity,
          theory_power: element.dataItemMap.theory_power,
          inverter_power: element.dataItemMap.inverter_power,
          ongrid_power: element.dataItemMap.ongrid_power,
          power_profit: element.dataItemMap.power_profit,
        },
        stationCode: element.stationCode,
        collectTime: element.collectTime,
        updateInterval: timeIntervalMapper(timeInterval),
      }))
  );

  await spaceUpdatesRepository.addSpaceUpdates(updatesToSaveArray);

  // Return the updated space updates from the database
  const spaceUpdatesFromDB: IUpdateSpace[] =
    await spaceUpdatesRepository.getSpaceUpdates(
      spaceId,
      startTime,
      endTime,
      await timeIntervalMapper(timeInterval)
    );

  return spaceUpdatesFromDB;
};

/**  HELPER FUNCTIONS */

/**
 * @param timeInterval
 * @returns
 */
const timeIntervalMapper = (timeInterval: string) => {
  switch (timeInterval) {
    case UPDATE_INTERVAL.DAY:
      return "hour";
    case UPDATE_INTERVAL.WEEK:
      return "day";
    case UPDATE_INTERVAL.MONTH:
      return "day";
    case UPDATE_INTERVAL.YEAR:
      return "month";
    default:
      throw new Error("Invalid time interval");
  }
};

const timeDuration = async (
  timeStampUnix: number,
  timeInterval: string
): Promise<[startTime: number, endTime: number]> => {
  let startTime: number;
  let endTime: number;

  switch (timeInterval) {
    case UPDATE_INTERVAL.DAY:
      startTime = moment(timeStampUnix).startOf("day").valueOf();
      endTime = moment(timeStampUnix).endOf("day").valueOf();
      break;
    case UPDATE_INTERVAL.WEEK:
      startTime = moment(timeStampUnix).startOf("week").valueOf();
      endTime = moment(timeStampUnix).endOf("week").valueOf();
      break;
    case UPDATE_INTERVAL.MONTH:
      startTime = moment(timeStampUnix).startOf("month").valueOf();
      endTime = moment(timeStampUnix).endOf("month").valueOf();
      break;
    case UPDATE_INTERVAL.YEAR:
      startTime = moment(timeStampUnix).startOf("year").valueOf();
      endTime = moment(timeStampUnix).endOf("year").valueOf();
      break;
    default:
      throw new Error("Invalid time interval");
  }

  return [startTime, endTime];
};
