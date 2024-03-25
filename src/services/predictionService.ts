import * as spaceUpdateRepository from "../repository/spaceUpdateRepository";

export interface ILocation {
  lat: number;
  lon: number;
}

export const getHourlyPrediction = async (
  spaceId: string,
  collectTime: number
) => {
  try {
    // Get hourly space updates
    // Get the hourly irradiance and temperature from open weather API
    // Send request to the prediction model
    // Save the prediction to the database
    // If faulty send notification
    // return the prediction
    const startOfHour = getStartOfHour(collectTime);
    const endOfHour = getEndOfHour(collectTime);

    const hourlyUpdate = await spaceUpdateRepository.getSpaceUpdates(
      spaceId,
      startOfHour,
      endOfHour,
      "hour"
    );

    if (hourlyUpdate.length === 0) {
      return "No data found";
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getStartOfHour = (collectTime: number) => {
  return collectTime - (collectTime % 3600000);
};

const getEndOfHour = (collectTime: number) => {
  return getStartOfHour(collectTime) + 3600000;
};
