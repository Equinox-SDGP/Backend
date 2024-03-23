import axios from "axios";
import * as fusionSessionService from "./fusionSessionService";

export const getHourSpaceUpdatesFromFusion = async (
  spaceId: string,
  collectTime: number
) => {
  axios
    .post(
      `${process.env.FUSIONSOLAR_API_BASE_URL}/thirdData/getKpiStationHour`,
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
    )
    .then((response) => {
      if (response.data.failCode === 407)
        throw new Error(
          "Too many requests to Fusion Solar API. Please try again later."
        );
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getDaySpaceUpdatesFromFusion = async (
  spaceId: string,
  collectTime: number
) => {
  axios
    .post(
      `${process.env.FUSIONSOLAR_API_BASE_URL}/thirdData/getKpiStationDay`,
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
    )
    .then((response) => {
      if (response.data.failCode === 407)
        throw new Error(
          "Too many requests to Fusion Solar API. Please try again later."
        );
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getMonthSpaceUpdatesFromFusion = async (
  spaceId: string,
  collectTime: number
) => {
  axios
    .post(
      `${process.env.FUSIONSOLAR_API_BASE_URL}/thirdData/getKpiStationMonth`,
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
    )
    .then((response) => {
      if (response.data.failCode === 407)
        throw new Error(
          "Too many requests to Fusion Solar API. Please try again later."
        );
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getYearSpaceUpdatesFromFusion = async (
  spaceId: string,
  collectTime: number
) => {
  axios
    .post(
      `${process.env.FUSIONSOLAR_API_BASE_URL}/thirdData/getKpiStationYear`,
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
    )
    .then((response) => {
      if (response.data.failCode === 407)
        throw new Error(
          "Too many requests to Fusion Solar API. Please try again later."
        );
      return response.data;
    })
    .catch((error) => {
      return error;
    });
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
