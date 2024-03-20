import SpaceDataModel, { ISpaceData } from "./models/spaceDataModel";

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
        from: "spaces", // The collection to join with
        localField: "stationCode", // The field from the "spaceData" collection
        foreignField: "_id", // The field from the "space" collection
        as: "spaceInfo", // The field to add the joined data to
      },
    },
    {
      $unwind: "$spaceInfo",
    },
    {
      $project: {
        // Define the fields you want to include in the final output
        stationCode: "$stationCode",
        // Include other fields from the "spaceData" collection as needed
        dataItemMap: "$dataItemMap",
        // Include fields from the "space" collection as needed
        spaceInfo: "$spaceInfo",
        // Include other fields from the "space" collection as needed
      },
    },
  ])
    .sort({ createdAt: -1 })
    .exec();

  return spaceData;
};
