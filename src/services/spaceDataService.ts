import { ISpaceData } from "../repository/models/spaceDataModel";
import * as spaceDataRepository from "../repository/spaceDataRepository";
import * as fusionSessionService from "./fusionSessionService";
import * as spaceService from "./spaceService";
import axios from "axios";

export const getSpaceInformation = async () => {
  const rawSpaceData = await getSpaceAggregatedData();
  const spaceDataWithWeather = await Promise.all(
    rawSpaceData.map(async (spaceData) => {
      try {
        const weatherData = await getCurrentWeatherData(
          spaceData.spaceInfo.latitude,
          spaceData.spaceInfo.longitude
        );
        console.log(weatherData.data);
        const spaceDataWithWeatherData = {
          ...spaceData,
          weather: weatherData.data,
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
  let spaceData = await spaceDataRepository.getRecentTotalSpaceData();

  if (!spaceData) {
    const spaceDataList = await fetchSpaceData();
    await setSpaceData(spaceDataList);
    spaceData = await spaceDataRepository.getRecentTotalSpaceData();
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
  const response = await axios.post(
    `${process.env.FUSIONSOLAR_API_BASE_URL}thirdData/getStationRealKpi`,
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
  return response.data;
};

export const setSpaceData = async (spaceData: any) => {
  if (spaceData !== undefined) {
    const spaceDataList = spaceData.data as ISpaceData[];

    for (const spaceData of spaceDataList) {
      await spaceDataRepository.addSpaceData(spaceData);
    }
  } else {
    console.log("Error setting space data");
  }
};

const getCurrentWeatherData = async (latitude: number, longitude: number) => {
  const currentWeatherData = await axios.get(
    `${process.env.OPENWEATHER_ONECALL_URL}?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&exclude=minutely,hourly,daily,alerts`
  );
  return currentWeatherData;
};
