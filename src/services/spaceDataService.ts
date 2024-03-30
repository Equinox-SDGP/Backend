import moment from "moment";
import { ISpaceData } from "../repository/models/spaceDataModel";
import * as spaceDataRepository from "../repository/spaceDataRepository";
import * as spacePredictionRepository from "../repository/spacePredictionRepository";
import * as fusionSessionService from "./fusionSessionService";
import * as spaceService from "./spaceService";
import axios from "axios";

export const getSpaceInformation = async () => {
  const rawSpaceData = await getSpaceAggregatedData();
  const spaceDataWithWeather = await Promise.all(
    rawSpaceData.map(async (spaceData) => {
      try {
        const weatherData = await getCurrentWeatherData(
          spaceData.latitude,
          spaceData.longitude
        );

        const irradianceData = await getDaysIrradiance(
          spaceData.latitude,
          spaceData.longitude
        );
        const currentDayIrradiance = getDayIrradiance(irradianceData);

        const predictionData =
          await spacePredictionRepository.getRecentPrediction(
            spaceData.stationCode
          );

        const spaceDataWithWeatherData = {
          ...spaceData,
          weather: weatherData,
          irradiance: currentDayIrradiance,
          prediction: predictionData?.prediction,
        };
        return spaceDataWithWeatherData;
      } catch (error) {
        console.error(error);
        return spaceData;
      }
    })
  );

  return spaceDataWithWeather;
};

export const getSpaceAggregatedData = async () => {
  let spaceData = await spaceDataRepository.getRecentSpaceUpdatesfromAll();

  if (!spaceData) {
    // No data found in the repository, fetch from external API and save to database
    const spaceDataList = await fetchSpaceData(); // Fetch data from external API
    await setSpaceData(spaceDataList); // Save fetched data to database
    spaceData = await spaceDataRepository.getRecentTotalSpaceData(); // Retrieve saved data from database
  }

  return spaceData;
};

export const getSpaceData = async () => {
  const recentSpaceData = await spaceDataRepository.getRecentSpaceData();

  if (recentSpaceData) {
    return recentSpaceData;
  }

  const spaceData = await fetchSpaceData();

  await setSpaceData(spaceData);
  return await spaceDataRepository.getRecentSpaceData();
};

export const fetchSpaceData = async () => {
  const stationCodes = await spaceService.getSpacesIdListString();
  try {
    const response = await axios.post(
      `${process.env.FUSIONSOLAR_API_BASE_URL}/thirdData/getStationRealKpi`,
      {
        stationCodes: stationCodes,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "xsrf-token": await fusionSessionService.getRecentFusionSession(),
        },
      }
    );
    if (response.data.data.failCode === 407) {
      throw new Error(
        "Error 407: Access frequency is too high, please try again later."
      );
    }
    return response.data;
  } catch (error: any) {
    return error.message;
  }
};

export const setSpaceData = async (spaceData: any) => {
  if (
    spaceData !== undefined &&
    Array.isArray(spaceData.data) &&
    spaceData.data.length > 0
  ) {
    const spaceDataList = spaceData.data as ISpaceData[];

    spaceDataList.forEach(async (spaceData) => {
      await spaceDataRepository.addSpaceData(spaceData);
    });
  } else {
    console.log("Error setting space data");
  }
};

export const getCurrentWeatherData = async (latitude: number, longitude: number) => {
  const currentWeatherData = await axios.get(
    `${process.env.OPENWEATHER_ONECALL_URL}?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&exclude=minutely,hourly,daily,alerts`
  );
  return currentWeatherData.data;
};

export const getDaysIrradiance = async (latitude: number, longitude: number) => {
  const currentDate = moment().format("YYYY-MM-DD");

  try {
    const daysIrradiance = await axios.get(
      `${process.env.OPENWEATHER_IRRADIANCE_URL}`,
      {
        params: {
          lat: latitude,
          lon: longitude,
          date: currentDate,
          apikey: process.env.OPENWEATHER_API_KEY,
        },
      }
    );
    return daysIrradiance.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getCurrentHourIrradiance = (irradianceData: any) => {
  const currentHour = moment().hour();
  irradianceData["irradiance"]["hourly"].forEach((hour: any) => {
    if (hour["hour"] === currentHour) {
      const currentHourIrradiance = {
        hour: hour["hour"],
        value: hour["clear_sky"]["dni"],
      };
      console.log(currentHourIrradiance);

      return currentHourIrradiance;
    }
  });
};

const getDayIrradiance = (irradianceData: any) => {
  return irradianceData["irradiance"]["daily"][0];
};

const getSolarPrediction = async (
  irradiance: number,
  module_temperature: number,
  real_ac_power: number
) => {
  const prediction = await axios.post(
    `${process.env.ML_MODEL_URL}/predict`,
    {
      irradiation: irradiance,
      module_temperature: module_temperature,
      real_ac_power: real_ac_power,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return prediction.data;
};
