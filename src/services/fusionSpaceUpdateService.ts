import axios from "axios";
import * as fusionSessionService from "./fusionSessionService";

/**
 * Getting hourly updates from fusion
 * @param spaceId
 * @param collectTime
 */
export const getHourSpaceUpdatesFromFusion = async (
  spaceId: string,
  collectTime: number
) => {
  try {
    const xsrfToken = await fusionSessionService.getRecentFusionSession();
    const response = await axios.post(
      `${process.env.FUSIONSOLAR_API_BASE_URL}/getKpiStationDay`,
      {
        stationCodes: spaceId,
        collectTime: collectTime,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "xsrf-token": xsrfToken,
        },
      }
    );

    if (response.data.failCode === 407) {
      throw new Error(
        "Too many requests to Fusion Solar API. Please try again later."
      );
    }

    return response.data;
  } catch (error: any) {
    throw new Error(
      "Error fetching hourly updates from Fusion Solar API: " + error.message
    );
  }
};

/**
 * Getting daily updates from Fusion
 * @param spaceId
 * @param collectTime
 */
export const getDaySpaceUpdatesFromFusion = async (
  spaceId: string,
  collectTime: number
) => {
  try {
    const xsrfToken = await fusionSessionService.getRecentFusionSession();
    const response = await axios.post(
      `${process.env.FUSIONSOLAR_API_BASE_URL}/getKpiStationDay`,
      {
        stationCodes: spaceId,
        collectTime: collectTime,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "xsrf-token": xsrfToken,
        },
      }
    );
    console.log(response)

    if (response.data.failCode === 407) {
      throw new Error(
        "Too many requests to Fusion Solar API. Please try again later."
      );
    }

    return response.data;
  } catch (error: any) {
    throw new Error(
      "Error fetching daily updates from Fusion Solar API: " + error.message
    );
  }
};

/**
 *  Getting monthly updates from fusion
 * @param spaceId
 * @param collectTime
 */
export const getMonthSpaceUpdatesFromFusion = async (
  spaceId: string,
  collectTime: number
) => {
  try {
    const xsrfToken = await fusionSessionService.getRecentFusionSession();
    const response = await axios.post(
      `${process.env.FUSIONSOLAR_API_BASE_URL}/getKpiStationMonth`,
      {
        stationCodes: spaceId,
        collectTime: collectTime,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "xsrf-token": xsrfToken,
        },
      }
    );

    if (response.data.failCode === 407) {
      throw new Error(
        "Too many requests to Fusion Solar API. Please try again later."
      );
    }

    return response.data;
  } catch (error: any) {
    throw new Error(
      "Error fetching monthly updates from Fusion Solar API: " + error.message
    );
  }
};

/**
 * Getting yearly updates from Fusion
 * @param spaceId
 * @param collectTime
 */
export const getYearSpaceUpdatesFromFusion = async (
  spaceId: string,
  collectTime: number
) => {
  try {
    const response = await axios.post(
      `${process.env.FUSIONSOLAR_API_BASE_URL}/getKpiStationYear`,
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
    console.log(response)
    if (response.data.failCode === 407)
      throw new Error(
        "Too many requests to Fusion Solar API. Please try again later."
      );

    return response.data;
  } catch (error) {
    return error;
  }
};

export interface IFusionUpdate {
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

export interface IFusionUpdateDataArray {
  data: IFusionUpdate[] | null;
}
