import { timeIntervalMapper, timeDuration, getIntervalMilliseconds } from "./util/timeUtil";

import { IUpdateSpace } from "../repository/models/spaceUpdatesModel";
import * as spaceUpdatesRepository from "../repository/spaceUpdateRepository";
import { UPDATE_INTERVAL } from "../repository/models/spaceUpdatesModel";
import {
  IFusionUpdate,
  IFusionUpdateDataArray,
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

/** READ FUNCTIONS */
export const getSpaceUpdatesGraph = async (
  spaceId: string,
  collectTime: number,
  timeInterval: string
) => {
  const updatesFromDatabase: IUpdateSpace[] = await saveSpaceUpdates(
    spaceId,
    collectTime,
    timeInterval
  );

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
): Promise<IUpdateSpace[]> => {
  try {
    const [startTime, endTime] = timeDuration(collectTime, timeInterval);
    const updatesFromDatabase = await getSpaceUpdatesFromDatabase(
      spaceId,
      startTime,
      endTime,
      timeInterval
    );
    const lastUpdatedTime = calculateLastUpdatedTime(
      updatesFromDatabase,
      startTime
    );

    if (!shouldFetchFromFusion(lastUpdatedTime, collectTime, timeInterval)) {
      return updatesFromDatabase;
    }

    const updatesFromFusion = await fetchUpdatesFromFusion(
      spaceId,
      lastUpdatedTime,
      timeInterval
    );
    const updatesToSaveArray = prepareUpdatesToSave(
      updatesFromFusion,
      lastUpdatedTime,
      timeInterval
    );
    await saveUpdatesToDatabase(updatesToSaveArray);

    return updatesToSaveArray;
  } catch (error) {
    console.error("Error fetching space updates from Fusion Solar API:", error);
    throw new Error("Error fetching space updates from Fusion Solar API");
  }
};

const getSpaceUpdatesFromDatabase = async (
  spaceId: string,
  startTime: number,
  endTime: number,
  timeInterval: string
) => {
  return await spaceUpdatesRepository.getSpaceUpdates(
    spaceId,
    startTime,
    endTime,
    await timeIntervalMapper(timeInterval)
  );
  console.log(updatesFromDatabase);

  // Determine the fetch time based on the latest collect time from the database
  let fetchTime = startTime;
  updatesFromDatabase.forEach((element: IUpdateSpace) => {
    fetchTime = Math.max(fetchTime, element.collectTime);
  });

  // Fetch updates from the Fusion Solar API based on the specified time interval
  let updatesFromFusion = [] as any;
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

  if (Array.isArray(updatesFromFusion.data)) {
    const updatesToSaveArray: IUpdateSpace[] = await Promise.all(
      updatesFromFusion.data
        .filter(
          (element: IFusionUpdateHourly) => element.collectTime > fetchTime
        )
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
  }

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

const calculateLastUpdatedTime = (
  updatesFromDatabase: IUpdateSpace[],
  startTime: number
) => {
  return updatesFromDatabase.reduce(
    (acc, curr) => Math.max(acc, curr.collectTime),
    startTime
  );
};

const shouldFetchFromFusion = (
  lastUpdatedTime: number,
  collectTime: number,
  timeInterval: string
) => {
  const intervalMilliseconds = getIntervalMilliseconds(timeInterval);
  return collectTime - lastUpdatedTime >= intervalMilliseconds;
};

const fetchUpdatesFromFusion = async (
  spaceId: string,
  lastUpdatedTime: number,
  timeInterval: string
) => {
  switch (timeInterval) {
    case UPDATE_INTERVAL.DAY:
      return await getHourSpaceUpdatesFromFusion(spaceId, lastUpdatedTime);
    case UPDATE_INTERVAL.WEEK:
      return await getDaySpaceUpdatesFromFusion(spaceId, lastUpdatedTime);
    case UPDATE_INTERVAL.MONTH:
      return await getMonthSpaceUpdatesFromFusion(spaceId, lastUpdatedTime);
    case UPDATE_INTERVAL.YEAR:
      return await getYearSpaceUpdatesFromFusion(spaceId, lastUpdatedTime);
    default:
      throw new Error("Invalid time interval");
  }
};

const prepareUpdatesToSave = async (
  updatesFromFusion: IFusionUpdateDataArray,
  lastUpdatedTime: number,
  timeInterval: string
) => {
  if (!Array.isArray(updatesFromFusion.data)) {
    throw new Error("Invalid data format from Fusion Solar API");
  }

  const updateInterval = await timeIntervalMapper(timeInterval);

  return updatesFromFusion.data
    .filter((element) => element.collectTime > lastUpdatedTime)
    .map((element) => ({
      dataItemMap: {
        radiation_intensity: element.dataItemMap.radiation_intensity,
        theory_power: element.dataItemMap.theory_power,
        inverter_power: element.dataItemMap.inverter_power,
        ongrid_power: element.dataItemMap.ongrid_power,
        power_profit: element.dataItemMap.power_profit,
      },
      stationCode: element.stationCode,
      collectTime: element.collectTime,
      updateInterval: updateInterval,
    }));
};

const saveUpdatesToDatabase = async (updatesToSaveArray: any[]) => {
  await spaceUpdatesRepository.addSpaceUpdates(updatesToSaveArray);
};
