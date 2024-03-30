import SpaceDataModel, { ISpaceData } from "./models/spaceDataModel";
import spaceModel from "./models/spaceModel";

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

export const getRecentTotalSpaceData = async () => {
  const hourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const spaceData = await SpaceDataModel.aggregate([
    {
      $match: {
        createdAt: { $gte: hourAgo },
      },
    },
    { $limit: 1 },
    {
      $lookup: {
        from: "spaces",
        localField: "stationCode",
        foreignField: "_id",
        as: "spaceInfo",
      },
    },
    {
      $unwind: "$spaceInfo",
    },
    {
      $project: {
        stationCode: "$stationCode",
        dataItemMap: "$dataItemMap",
        spaceInfo: "$spaceInfo",
      },
    },
  ])
    .sort({ createdAt: -1 })
    .exec();

  return spaceData;
};

export const getRecentSpaceUpdatesfromAll = async () => {
  const hourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const spaceData = await spaceModel.aggregate([
    {
      $lookup: {
        from: "spacedatas",
        localField: "_id",
        foreignField: "stationCode",
        as: "spaceData",
      },
    },
    {
      $unwind: "$spaceData",
    },
    {
      $project: {
        _id: 0,
        capacity: "$capacity",
        latitude: "$latitude",
        longitude: "$longitude",
        plantName: "$plantName",
        plantAddress: "$plantAddress",
        stationCode: "$_id",
        dataItemMap: "$spaceData.dataItemMap",
        createdAt: "$spaceData.createdAt",
      },
    },
    {
      $sort: { createdAt: -1 }, // Sort by createdAt field in descending order
    },
    {
      $limit: 1,
    },
  ]);

  return spaceData;
};

/** UPDATE */

/** DELETE */