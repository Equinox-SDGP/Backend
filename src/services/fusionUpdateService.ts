import axios from "axios";
import * as fusionSessionService from "./fusionSessionService";

export const getHourSpaceUpdatesFromFusion = async (
  spaceId: string,
  collectTime: number
) => {
  const hourlyUpdate = await axios.post(
    `${process.env.FUSIONSOLAR_API_BASE_URL}thirdData/getKpiStationHour`,
    {
      stationCodes: spaceId,
      collectTime: collectTime,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "xsrf-token": await fusionSessionService.getRecentFusionSession(),
      },
    }
  );
  return hourlyUpdate.data;
};

export const getDaySpaceUpdatesFromFusion = async (
  spaceId: string,
  collectTime: number
) => {
  const dailyUpdate = await axios.post(
    `${process.env.FUSIONSOLAR_API_BASE_URL}thirdData/getKpiStationDay`,
    {
      stationCodes: spaceId,
      collectTime: collectTime,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "xsrf-token": await fusionSessionService.getRecentFusionSession(),
      },
    }
  );
  return dailyUpdate.data;
};

export const getMonthSpaceUpdatesFromFusion = async (
  spaceId: string,
  collectTime: number
) => {
  const monthlyUpdate = await axios.post(
    `${process.env.FUSIONSOLAR_API_BASE_URL}thirdData/getKpiStationMonth`,
    {
      stationCodes: spaceId,
      collectTime: collectTime,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "xsrf-token": await fusionSessionService.getRecentFusionSession(),
      },
    }
  );
  return monthlyUpdate.data;
};

export const getYearSpaceUpdatesFromFusion = async (
  spaceId: string,
  collectTime: number
) => {
  const yearlyUpdate = await axios.post(
    `${process.env.FUSIONSOLAR_API_BASE_URL}thirdData/getKpiStationYear`,
    {
      stationCodes: spaceId,
      collectTime: collectTime,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "xsrf-token": await fusionSessionService.getRecentFusionSession(),
      },
    }
  );
  return yearlyUpdate.data;
};
