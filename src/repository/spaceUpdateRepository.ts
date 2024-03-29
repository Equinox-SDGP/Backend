import UpdateSpace from "./models/spaceUpdatesModel";
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

export const getSpaceUpdate = async (
  stationCode: string,
  collectTime: number,
  timeInterval: string
) => {
  const spaceUpdate = await UpdateSpaceModel.findOne({
    stationCode,
    collectTime,
    updateInterval: timeInterval,
  }).exec();

  return spaceUpdate;
};

/** UPDATE */
export const updateSpaceUpdate = async (spaceUpdate: IUpdateSpace) => {
  const updatedSpaceUpdate = await UpdateSpaceModel.findOneAndUpdate(
    {
      stationCode: spaceUpdate.stationCode,
      collectTime: spaceUpdate.collectTime,
    },
    spaceUpdate,
    { new: true }
  ).exec();
  return updatedSpaceUpdate;
};

/** DELETE */
export const deleteSpaceUpdateById = async (id: string) => {
  await UpdateSpace.findByIdAndDelete(id).exec();
};
