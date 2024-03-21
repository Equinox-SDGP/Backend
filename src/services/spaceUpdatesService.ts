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

export const getSpaceUpdates = async (
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
};

/** This function fetches space updates
 *
 *  - If the space updates are not found in the database, it fetches the updates from the Fusion Solar API and saves them to the database.
 *  - then a new request is made to the database to get the space updates.
 *  - then the updates are returned
 *
 * @param spaceId
 * @param startTime
 * @param endTime
 * @param timeInterval
 * @returns
 */
export const saveSpaceUpdates = async (
  spaceId: string,
  startTime: number,
  endTime: number,
  timeInterval: string
) => {
  // Get space updates from the database
  const updatesFromDatabase = await spaceUpdatesRepository.getSpaceUpdates(
    spaceId,
    startTime,
    endTime,
    timeInterval
  );

  // Determine the fetch time based on the latest collect time from the database
  let fetchTime = startTime;
  updatesFromDatabase.forEach((element: IUpdateSpace) => {
    fetchTime = Math.max(fetchTime, element.collectTime);
  });
  console.log(fetchTime);

  // Fetch updates from the Fusion Solar API based on the specified time interval
  let updatesFromFusion = [];
  try {
    switch (timeInterval) {
      case UPDATE_INTERVAL.HOUR:
        updatesFromFusion = await getHourSpaceUpdatesFromFusion(
          spaceId,
          fetchTime
        );
        break;
      case UPDATE_INTERVAL.DAY:
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
  console.log(updatesFromFusion);

  // If no updates are found in the database, return the updates from Fusion Solar API
  //  if (updatesFromFusion === undefined) return updatesFromDatabase;

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
        updateInterval: timeInterval,
      }))
  );

  console.log(updatesToSaveArray);

  await spaceUpdatesRepository.addSpaceUpdates(updatesToSaveArray);

  // Return the updated space updates from the database
  return spaceUpdatesRepository.getSpaceUpdates(
    spaceId,
    startTime,
    endTime,
    timeInterval
  );
};
