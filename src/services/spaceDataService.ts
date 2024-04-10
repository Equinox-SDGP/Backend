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
          spaceData.latitude,
          spaceData.longitude
        );
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
      `${process.env.FUSIONSOLAR_API_BASE_URL}/getStationRealKpi`,
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
    throw new Error("Error fetching space data from Fusion Solar API: " + error.message);
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

const getCurrentWeatherData = async (latitude: number, longitude: number) => {
  const currentWeatherData = await axios.get(
    `${process.env.OPENWEATHER_ONECALL_URL}?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&exclude=minutely,hourly,daily,alerts`
  );
  return currentWeatherData;
};
