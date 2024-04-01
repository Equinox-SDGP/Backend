import { getSpaceDataList } from "@controllers/spaceDataController";
import { getSpaceAggregatedData } from "./spaceDataService";

export function makeSolarPrediction() {
  getSpaceAggregatedData().then((spaceData) => {
    console.log(spaceData);
  });
}
