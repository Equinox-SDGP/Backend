import moment from "moment";

import { UPDATE_INTERVAL } from "../../repository/models/spaceUpdatesModel";

/** This function maps the time interval to the corresponding time unit
 * @param timeInterval
 * @returns
 */
export const timeIntervalMapper = (timeInterval: string) => {
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

/** This function returns the start and end time of a given time interval
* @param timeStampUnix
* @param timeInterval
* @returns [startTime, endTime]
*/
export const timeDuration = async (
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