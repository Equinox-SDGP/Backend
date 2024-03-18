import axios, { AxiosError } from "axios";

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
export const setFusionToken = async (token: string) => {
  if (token !== null) {
    await fusionSessionRepository.setFusionSession(token);
  } else {
    console.log("Error setting token");
  }
};

/**
 * Getting Fusion Token from the Fusion Solar API
 */
export const getFusionToken = async () => {
  try {
    const response = await axios.post(
      `${process.env.FUSIONSOLAR_API_BASE_URL}thirdData/login`,
      {
        userName: process.env.FUSIONSOLAR_API_USERNAME,
        systemCode: process.env.FUSIONSOLAR_API_SYSTEMCODE,
      }
    );
    const token = response.headers["xsrf-token"];

    return token;
  } catch (e) {
    const error = e as AxiosError;
    console.log("Error fetching token: ", error.message);
    return null;
  }
};
