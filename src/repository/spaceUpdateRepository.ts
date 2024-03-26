import UpdateSpaceModel, { IUpdateSpace } from "./models/spaceUpdatesModel";

/** CREATE */
export const addSpaceUpdate = async (spaceUpdate: IUpdateSpace) => {
  const newSpaceUpdate = new UpdateSpaceModel(spaceUpdate);
  return newSpaceUpdate.save();
};

export const addSpaceUpdates = async (spaceUpdates: IUpdateSpace[]) => {
  return UpdateSpaceModel.insertMany(spaceUpdates);
};

/** READ */
export const getSpaceUpdates = async (
  stationCode: string,
  startTime: number,
  endTime: number,
  timeInterval: string
) => {
  const spaceUpdates = await UpdateSpaceModel.find({
    stationCode,
    collectTime: { $gte: startTime, $lte: endTime },
    updateInterval: timeInterval,
  })
    .sort()
    .exec();
  return spaceUpdates;
};
