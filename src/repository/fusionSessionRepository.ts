import FusionSessionModel from "./models/fusionSessionModel";

export const setFusionSession = (token: string) => {
  const newFusionSession = new FusionSessionModel({ token });
  return newFusionSession.save();
};

export const getRecentFusionSession = async () => {
  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

  const recentSession = await FusionSessionModel.findOne({
    createdAt: { $gte: thirtyMinutesAgo },
  })
    .sort({ createdAt: -1 })
    .exec();
    
  return await recentSession?.token;
};