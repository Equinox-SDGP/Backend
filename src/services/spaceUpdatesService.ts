import { timeIntervalMapper, timeDuration } from "./util/timeUtil";
import {
  calculateLastUpdatedTime,
  shouldFetchFromFusion,
} from "./util/spaceUpdatesUtil";

import {
  IDataItemMap,
  IUpdateSpace,
  UPDATE_INTERVAL,
} from "../repository/models/spaceUpdatesModel";
import * as spaceUpdatesRepository from "../repository/spaceUpdateRepository";
import {
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

/** This function fetches space updates
 *
 *  - It fetches the updates from the database
 *  - then returns the updates
 *
 * @param spaceId
 * @param collectTime
 * @param timeInterval
 * @returns
 */
export const getSpaceUpdatesGraph = async (
  spaceId: string,
  collectTime: number,
  timeInterval: string
) => {
  const updatesFromDatabase = await getSpaceUpdates(
    spaceId,
    collectTime,
    timeInterval
  );

  if (timeInterval === UPDATE_INTERVAL.DAY) {
    return await convertToGraphDataDay(updatesFromDatabase);
  } else if (timeInterval === UPDATE_INTERVAL.WEEK) {
    return await convertToGraphDataWeek(updatesFromDatabase);
  } else if (timeInterval === UPDATE_INTERVAL.MONTH) {
    return await convertToGraphDataMonth(updatesFromDatabase);
  } else if (timeInterval === UPDATE_INTERVAL.YEAR) {
    return await convertToGraphDataYear(updatesFromDatabase);
  }
};

/** This function fetches space updates
 *
 *  - It fetches the updates from the database
 *  - then returns the updates
 *
 * @param spaceId
 * @param collectTime
 * @param timeInterval
 * @returns
 */
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

/** CREATE FUNCTIONS */

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
    const updatesFromDatabase = await getSpaceUpdates(
      spaceId,
      collectTime,
      timeInterval
    );
    const lastUpdatedTime = calculateLastUpdatedTime(
      updatesFromDatabase,
      startTime
    );

    // if (!shouldFetchFromFusion(lastUpdatedTime, collectTime, timeInterval)) {
    //   return updatesFromDatabase;
    // }
    const updatesFromFusion = await fetchUpdatesFromFusion(
      spaceId,
      lastUpdatedTime,
      timeInterval
    );
    console.log(updatesFromFusion);
    const updatesToSaveArray = await prepareUpdatesToSave(
      updatesFromFusion,
      lastUpdatedTime,
      timeInterval
    );
    await saveUpdatesToDatabase(updatesToSaveArray);

    return await getSpaceUpdates(spaceId, collectTime, timeInterval);
  } catch (error:any) {
    console.error("Error fetching space updates from Fusion Solar API:", error);
    throw new Error("Error fetching space updates from Fusion Solar API" + error.message);
  }
};

/** This function fetches space updates from the Fusion Solar API
 *
 *  - It fetches updates based on the time interval
 *  - then returns the updates
 *
 * @param spaceId
 * @param lastUpdatedTime
 * @param timeInterval
 * @returns
 */
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
      return await getDaySpaceUpdatesFromFusion(spaceId, lastUpdatedTime);
    case UPDATE_INTERVAL.YEAR:
      return await getMonthSpaceUpdatesFromFusion(spaceId, lastUpdatedTime);
    default:
      throw new Error("Invalid time interval");
  }
};

/** This function prepares updates to save
 *
 *  - It filters the updates from the Fusion Solar API based on the last updated time
 *  - then maps the updates to the database schema
 *  - then returns the updates
 *
 * @param updatesFromFusion
 * @param lastUpdatedTime
 * @param timeInterval
 * @returns
 */
const prepareUpdatesToSave = async (
  updatesFromFusion: IFusionUpdateDataArray,
  lastUpdatedTime: number,
  timeInterval: string
) => {
  if (!Array.isArray(updatesFromFusion.data)) {
    throw new Error("Invalid data format from Fusion Solar API");
  }

  const updateInterval = await timeIntervalMapper(timeInterval);

  const filteredUpdates = updatesFromFusion.data
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
    console.log(filteredUpdates);
    return filteredUpdates;
};

/** This function saves updates to the database
 *  - It saves the updates to the database
 * @param updatesToSaveArray
 */

const saveUpdatesToDatabase = async (updatesToSaveArray: any[]) => {
  await spaceUpdatesRepository.addSpaceUpdates(updatesToSaveArray);
};

/** UPDATE FUNCTIONS */

export const updateSpaceUpdates = async (
  spaceId: string,
  collectTime: number,
  timeInterval: string,
  dataItemMap: IDataItemMap
) => {
  const spaceUpateGiven = {
    stationCode: spaceId,
    collectTime: collectTime,
    updateInterval: timeInterval,
    dataItemMap: dataItemMap,
  } as IUpdateSpace;
  try {
    const updatedSpaceUpdate = await spaceUpdatesRepository.updateSpaceUpdate(
      spaceUpateGiven
    );
    return updatedSpaceUpdate;
  } catch (error) {}
};

/** DELETE FUNCTION */
export const deleteSpaceUpdates = async (
  spaceId: string,
  collectTime: number,
  timeInterval: string
) => {
  try {
    const spaceData = await spaceUpdatesRepository.getSpaceUpdate(
      spaceId,
      collectTime,
      timeInterval
    );

    if (!spaceData) {
      throw new Error("Space updates not found");
    }
    await spaceUpdatesRepository.deleteSpaceUpdateById(spaceData._id);
  } catch (error) {
    console.error("Error deleting space updates", error);
    throw new Error("Error deleting space updates");
  }
};
