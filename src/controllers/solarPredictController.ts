import * as spaceDataService from '../services/spaceDataService';                                                            

export const getSolarPredictByHour = async () => {
    const spaceData = await spaceDataService.getSpaceData();
}