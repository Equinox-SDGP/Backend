import {Schema, model} from "mongoose";


export interface ISolarPrediction {
    stationCode: string;
    collectTime: number;
    timeInterval: string;
    weatherData:  {
        temperature: number;
        irradiance: {
            ghi: number;
            dni: number;
            dhi: number;
        }
    }
    inverterData: {
        power: number;
        efficiency: number;
    }
    prediction: {
        power: number;
        radiation: number;
        healthState: string;
    }
}

const solarPredictionSchema = new Schema(
    {
        stationCode: { type: String, required: true },
        collectTime: { type: Number, required: true },
        weatherData: {
            temperature: { type: Number, required: true },
            irradiance: {
                ghi: { type: Number, required: true },
                dni: { type: Number, required: true },
                dhi: { type: Number, required: true },
            }
        },
        inverterData: {
            power: { type: Number, required: true },
            efficiency: { type: Number, required: true },
        },
        prediction: {
            power: { type: Number, required: true },
            radiation: { type: Number, required: true },
            healthState: { type: String, required: true },
        }
    },
    { timestamps: true }
);

const solarPredictionModel = model<ISolarPrediction>("SolarPrediction", solarPredictionSchema);
export default solarPredictionModel;