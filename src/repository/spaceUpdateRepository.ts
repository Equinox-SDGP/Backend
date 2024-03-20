import UpdateSpaceModel, { IUpdateSpace } from "./models/spaceUpdatesModel";

/** CREATE */
export const addSpaceUpdate = async (spaceUpdate: IUpdateSpace) => {
  const newSpaceUpdate = new UpdateSpaceModel(spaceUpdate);
  return newSpaceUpdate.save();
};

/** READ */
export const getSpaceUpdates = async (
  stationCode: string,
  startTime: number,
  endTime: number,
  timeInterval: string
) => {
    const spaceUpdates = await UpdateSpaceModel.findOne({
        stationCode,
        collectTime: { $gte: startTime, $lte: endTime },
        updateInterval: timeInterval,
    })
        .sort({ collectTime: -1 })
        .exec();
    
    return spaceUpdates;
}; 
