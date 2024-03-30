import { Schema, model, Document } from "mongoose";

export interface ISpace extends Document {
  _id: string;
  capacity: number;
  contactMethod: string | null;
  contactPerson: string | null;
  gridConnectionDate: Date;
  latitude: string;
  longitude: string;
  plantAddress: string;
  plantName: string;
  aliasName: string | null;
  plantCode?: string;
}

export interface IFusionSpace {
  plantCode: string;
  capacity: number;
  contactMethod: string | null;
  contactPerson: string | null;
  gridConnectionDate: Date;
  latitude: string;
  longitude: string;
  plantAddress: string;
  plantName: string;
  aliasName: string | null;
}

const spaceSchema = new Schema({
  _id: { type: String, required: true },
  capacity: { type: Number, required: true },
  contactMethod: { type: String, required: false },
  contactPerson: { type: String, required: false },
  gridConnectionDate: { type: Date, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  plantAddress: { type: String, required: true },
  plantName: { type: String, required: true },
  aliasName: { type: String, required: false },
});

const spaceModel = model<ISpace>("Space", spaceSchema);
export default spaceModel;


// Example of space data
const spaceData = {
  capacity: 3.27,
  contactMethod: null,
  contactPerson: null,
  gridConnectionDate: "2023-09-13T02:30:00+05:30",
  latitude: "6.847778",
  longitude: "79.950000",
  plantAddress: "Sri LankaWestern ProvinceWestern Province1st Lane1st Lane",
  plantCode: "NE=51002841",
  plantName: "Prof.Devaka",
};
