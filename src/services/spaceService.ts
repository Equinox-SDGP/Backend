import axios from "axios";
import * as fusionSessionService from "../services/fusionSessionService";
import * as SpaceRepository from "../repository/spaceRepository";
import { ISpace } from "../repository/models/spaceModel";

/** CREATE */
export const createSpace = async (spaceData: ISpace) => {
  return SpaceRepository.createSpace(spaceData);
};

/** READ */
export const getSpacesList = async () => {
  return SpaceRepository.getSpacesList();
};

export const getSpacesIdList = async () => {
  const spacesList = await getSpacesList();

  const spacesIdList = spacesList.map((space) => {
    return space._id;
  });

  return spacesIdList;
};

export const getSpacesIdListString = async () => {
  const spacesIdList = await getSpacesIdList();
  const spacesIdListString = spacesIdList.toString();
  console.log(spacesIdListString);
  return spacesIdListString;
};

export const getSpacesListFromFusion = async () => {
  const spacesQuery = await axios.post(
    `${process.env.FUSIONSOLAR_API_BASE_URL}thirdData/stations`,
    {
      pageNo: 1,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "xsrf-token": await fusionSessionService.getRecentFusionSession(),
      },
    }
  );

  return spacesQuery.data.data.list;
};

export const getSpaceDataFromFusion = async (plantCodes: string[]) => {
  let stationCodes = plantCodes.toString();
  console.log(stationCodes);

  const spacesQuery = await axios.post(
    `${process.env.FUSIONSOLAR_API_BASE_URL}thirdData/getStationRealKpi`,
    {
      stationCodes,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "xsrf-token": await fusionSessionService.getRecentFusionSession(),
      },
    }
  );
  return spacesQuery.data.data;
};

export const getSpace = async (spaceId: string) => {
  return SpaceRepository.getSpace(spaceId);
};

/** UPDATE */
export const updateSpace = async (spaceId: string, spaceData: ISpace) => {
  return SpaceRepository.updateSpace(spaceId, spaceData);
};

/** DELETE */
export const deleteSpace = async (spaceId: string) => {
  return SpaceRepository.deleteSpace(spaceId);
};
