import solarPredictionModel, {
  ISolarPrediction,
} from "./models/solarPredictionModel";

// CREATE operation
export async function createSolarPrediction(
  solarPrediction: ISolarPrediction
): Promise<ISolarPrediction> {
  return await solarPredictionModel.create(solarPrediction);
}

// READ operation
export async function getSolarPrediction(
  stationCode: string,
  collectTime: number
): Promise<ISolarPrediction | null> {
  return await solarPredictionModel
    .findOne({ stationCode, collectTime })
    .exec();
}

export async function getRecentSolarPrediction(
  stationCode: string
): Promise<ISolarPrediction | null> {
  return await solarPredictionModel
    .findOne({ stationCode })
    .sort({ collectTime: -1 })
    .exec();
}

// UPDATE operation
export async function updateSolarPrediction(
  stationCode: string,
  collectTime: number,
  solarPrediction: ISolarPrediction
): Promise<ISolarPrediction | null> {
  return await solarPredictionModel
    .findOneAndUpdate({ stationCode, collectTime }, solarPrediction, {
      new: true,
    })
    .exec();
}

// DELETE operation
export async function deleteSolarPrediction(
  stationCode: string,
  collectTime: number
): Promise<ISolarPrediction | null> {
  return await solarPredictionModel.findOneAndDelete({
    stationCode,
    collectTime,
  });
}
