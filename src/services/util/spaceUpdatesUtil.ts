import { IUpdateSpace } from "../../repository/models/spaceUpdatesModel";
import { getIntervalMilliseconds } from "./timeUtil";

export const calculateLastUpdatedTime = (
  updatesFromDatabase: IUpdateSpace[],
  startTime: number
) => {
  return updatesFromDatabase.reduce(
    (acc, curr) => Math.max(acc, curr.collectTime),
    startTime
  );
};
export const shouldFetchFromFusion = (
  lastUpdatedTime: number,
  collectTime: number,
  timeInterval: string
) => {
  const intervalMilliseconds = getIntervalMilliseconds(timeInterval);
  console.log(collectTime - lastUpdatedTime >= intervalMilliseconds);
  return collectTime - lastUpdatedTime >= intervalMilliseconds;
};
