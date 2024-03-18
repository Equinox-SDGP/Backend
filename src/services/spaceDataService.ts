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
