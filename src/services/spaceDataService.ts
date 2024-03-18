import { set } from "mongoose";
import { ISpaceData } from "../repository/models/spaceDataModel";
import * as spaceDataRepository from "../repository/spaceDataRepository";
import * as fusionSessionService from "./fusionSessionService";
import * as spaceService from "./spaceService";
import axios from "axios";

export const getSpaceData = async () => {
  const recentSpaceData = await spaceDataRepository.getRecentSpaceData();

  if (recentSpaceData) {
    return recentSpaceData;
  }

  const spaceData = await fetchSpaceData();

  setSpaceData(spaceData);
  return await spaceDataRepository.getRecentSpaceData();
};

export const fetchSpaceData = async () => {
  try {
    const response = await axios.post(
      `${process.env.FUSIONSOLAR_API_BASE_URL}thirdData/getStationRealKpi`,
      {
        stationCodes: await spaceService.getSpacesIdListString(),
      },
      {
        headers: {
          "Content-Type": "application/json",
          "xsrf-token": await fusionSessionService.getRecentFusionSession(),
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const setSpaceData = async (spaceData: ISpaceData | void) => {
  if (spaceData !== undefined) {
    await spaceDataRepository.addSpaceData(spaceData);
  } else {
    console.log("Error setting space data");
  }
};
