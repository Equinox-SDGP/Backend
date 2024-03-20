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

  if (hourlyUpdate.data.failCode === 407)
    throw new Error(
      "Too many requests to Fusion Solar API. Please try again later."
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
  if (dailyUpdate.data.failCode === 407)
    throw new Error(
      "Too many requests to Fusion Solar API. Please try again later."
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
  if (monthlyUpdate.data.failCode === 407)
    throw new Error(
      "Too many requests to Fusion Solar API. Please try again later."
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
  if (yearlyUpdate.data.failCode === 407)
    throw new Error(
      "Too many requests to Fusion Solar API. Please try again later."
    );
  return yearlyUpdate.data;
};

export interface IFusionUpdateHourly {
  collectTime: number;
  stationCode: string;
  dataItemMap: {
    radiation_intensity: number | null;
    power_profit: number | null;
    theory_power: number | null;
    ongrid_power: number | null;
    inverter_power: number | null;
  };
}
