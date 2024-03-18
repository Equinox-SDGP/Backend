import { ISpaceData } from "./models/spaceDataModel";
import SpaceDataModel from "./models/spaceDataModel";

/** CREATE */
export const addSpaceData = async (spaceData: ISpaceData) => {
  const newSpaceData = new SpaceDataModel(spaceData);
  return newSpaceData.save();
};

/** READ */
export const getSpaceData = async (stationCode: string) => {
  const spaceData = await SpaceDataModel.findOne({ stationCode })
    .sort({ createdAt: -1 })
    .exec();

  return spaceData;
};

export const getRecentSpaceData = async () => {
  const hourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const spaceData = await SpaceDataModel.findOne({
    createdAt: { $gte: hourAgo },
  })
    .sort({ createdAt: -1 })
    .exec();

  return spaceData;
};
