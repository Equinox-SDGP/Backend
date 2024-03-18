import HourlyUpdate from "./models/hourlyUpdateModel";
import { IHourlyUpdate } from "./models/hourlyUpdateModel";

export const addHourlyUpdate = async (hourlyUpdateData: IHourlyUpdate) => {
  const newHourlyUpdate = new HourlyUpdate(hourlyUpdateData);
  return newHourlyUpdate.save();
};

export const getUpdates = async (
  deviceId: String,
  start: Number,
  end: Number
) => {
  const updates = await HourlyUpdate.find({
    stationCode: deviceId,
    collectTime: {
      $gte: start,
      $lte: end,
    },
  }).exec();

  return updates;
};
