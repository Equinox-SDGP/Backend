import SpacePredictionModel,{ISpacePrediction} from "./models/spacePredictionModel";

// CREATE Repository
export const addPrediction = async (prediction: ISpacePrediction) => {
  const newPrediction = new SpacePredictionModel(prediction);
  await newPrediction.save();
  return newPrediction;
};

// READ Repository
export const getPrediction = async (
  spaceId: string,
  collectTime: number,
  timeInterval: string
) => {
  const prediction = await SpacePredictionModel.findOne({
    stationCode: spaceId,
    collectTime,
    updateInterval: timeInterval,
  });
  return prediction;
};

export const getRecentPrediction = async (spaceId: string) => {
  const recentPrediction = await SpacePredictionModel.findOne({
    stationCode: spaceId,
  }).sort({ collectTime: -1 });

  return recentPrediction;
};
