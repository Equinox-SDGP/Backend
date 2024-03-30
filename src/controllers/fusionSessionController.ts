import * as fusionSessionService from "../services/fusionSessionService";

export const setPeriodicFusionSession = async () => {
  const token = await fusionSessionService.getFusionToken();
  await fusionSessionService.setFusionToken(token);
};
