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
  await setFusionToken(token);

  return await fusionSessionRepository.getRecentFusionSession();
};

/**
 * Setting Fusion Token in the database
 * @param token
 */
export const setFusionToken = async (token: string | void) => {
  if (token !== null && typeof token === "string") {
    await fusionSessionRepository.setFusionSession(token);
  }
};

/**
 * Getting Fusion Token from the Fusion Solar API
 */
export const getFusionToken = async () => {
  try {
    const response = await axios.post(
      `${process.env.FUSIONSOLAR_API_BASE_URL}/login`,
      {
        userName: process.env.FUSIONSOLAR_API_USERNAME,
        systemCode: process.env.FUSIONSOLAR_API_SYSTEMCODE,
      }
    );

    const token = response.headers["xsrf-token"];
    return token;
  } catch (error: any) {
    throw new Error("Error fetching token: " + error.message);
  }
};
