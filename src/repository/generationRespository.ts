import HourlyUpdate from "./models/hourlyUpdateModel";

export interface IGenerationDataRequest {
  deviceId: number;
  startTime: number;
  endTime: number;
}
export const getGeneration = async (
  generationDataRequest: IGenerationDataRequest
) => {
  const generationData = HourlyUpdate.find({
    deviceId: generationDataRequest.deviceId,
    timestamp: {
      $gte: new Date(generationDataRequest.startTime),
      $lte: new Date(generationDataRequest.endTime),
    },
  }).exec();
  return generationData;
};
