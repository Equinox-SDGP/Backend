import axios, { AxiosError, AxiosResponse } from "axios";

import * as fusionSessionRepository from "../repository/fusionSessionRepository";

/**
 * Getting the most recent Fusion Token from the database
 * @returns {Promise<string>} - The most recent Fusion Token
 */
export const getRecentFusionSession = async () => {
  const recentToken = await fusionSessionRepository.getRecentFusionSession();

  if (recentToken) {
    return recentToken;
  }
  const token = await getFusionToken();
  setFusionToken(token);

  return await fusionSessionRepository.getRecentFusionSession();
};

/**
 * Setting Fusion Token in the database
 * @param token
 */
export const setFusionToken = async (token: string | void) => {
  if (token !== null && token !== undefined) {
    await fusionSessionRepository.setFusionSession(token);
  } else {
    console.log("Error setting token");
  }
};

/**
 * Getting Fusion Token from the Fusion Solar API
 */
export const getFusionToken = async () => {
  axios
    .post(`${process.env.FUSIONSOLAR_API_BASE_URL}/thirdData/login`, {
      userName: process.env.FUSIONSOLAR_API_USERNAME,
      systemCode: process.env.FUSIONSOLAR_API_SYSTEMCODE,
    })
    .then((response: AxiosResponse) => {
      return response.headers["xsrf-token"];
    })
    .catch((error: AxiosError) => {
      throw new Error("Error fetching token " + error.message);
    });
};
