import { Stack } from "data-structure-typed";
import * as deviceUpdatesRepository from "../repository/deviceUpdate";

export const getHourlyHistoricalData = async (
  startTime: number,
  endTime: number,
  deviceId: string
) => {
  const updates = await deviceUpdatesRepository.getUpdates(
    deviceId,
    startTime,
    endTime
  );

  const hourlyUpdateStack = new Stack();
  let prevHours = -1;

  for (let i = 0; i < updates.length; i++) {
    let formattedTime = new Date(updates[i].collectTime * 1000);
    let hours = formattedTime.getUTCHours();

    if (prevHours !== hours) {
      prevHours = hours;
      hourlyUpdateStack.push(updates[i]);
    } else {
      const top = hourlyUpdateStack.peek();
      top.dataItemMap.inverter_power += updates[i].dataItemMap.inverter_power;
      top.dataItemMap.ongrid_power += updates[i].dataItemMap.ongrid_power;
      top.dataItemMap.power_profit += updates[i].dataItemMap.power_profit;
    }
  }
   console.log(hourlyUpdateStack);

  return hourlyUpdateStack;
};

export const getDailyHistoricalData = async (
  deviceId: string,
  startTime: number,
  endTime: number
) => {
  // Implement this method to get the daily historical data for a device
};

export const getWeeklyHistoricalData = async (
  deviceId: string,
  startTime: number,
  endTime: number
) => {
  // Implement this method to get the weekly historical data for a device
};

export const getMonthlyHistoricalData = async (
  deviceId: string,
  startTime: number,
  endTime: number
) => {
  // Implement this method to get the monthly historical data for a device
};

export const getYearlyHistoricalData = async (
  deviceId: string,
  startTime: number,
  endTime: number
) => {
  // Implement this method to get the yearly historical data for a device
};
