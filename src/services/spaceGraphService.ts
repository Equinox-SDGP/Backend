import moment from "moment";
import { IUpdateSpace } from "../repository/models/spaceUpdatesModel";

export const convertToGraphDataDay = (spaceUpdates: IUpdateSpace[]) => {
  // Initialize an array to hold data for each hour of the day
  const hourData = Array.from({ length: 24 }, (_, index) => {
    let label;
    if (index % 4 === 0) {
      label = moment().startOf("day").hour(index).format("hhA");
    } else {
      label = "";
    }

    return {
      value: 0,
      label: label,
    };
  });

  // Initialize max value to zero
  let maxValue = 0;

  // Update hourData and calculate maxValue using spaceUpdates
  spaceUpdates.forEach((element: IUpdateSpace) => {
    const hourOfDay = moment(element.collectTime).hour();
    hourData[hourOfDay].value = parseFloat(
      (element.dataItemMap.inverter_power || 0).toFixed(1)
    );
    // Update maxValue if needed
    maxValue = Math.max(maxValue, hourData[hourOfDay].value);
  });

  // Construct the graph data object
  const graphData = {
    day: { data: hourData },
    maxValue: maxValue * 1.25,
  };

  return graphData;
};

export const convertToGraphDataWeek = (spaceUpdates: IUpdateSpace[]) => {
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekData = Array.from({ length: 7 }, (_, index) => ({
    value: 0,
    label: dayLabels[index],
  }));

  let maxValue = 0;
  spaceUpdates.forEach((element: IUpdateSpace) => {
    const dayOfWeek = moment(element.collectTime).day();
    weekData[dayOfWeek].value += parseFloat(
      (element.dataItemMap.inverter_power || 0).toFixed(1)
    );
    maxValue = Math.max(maxValue, weekData[dayOfWeek].value);
  });

  const graphData = {
    week: { data: weekData },
    maxValue: maxValue * 1.25,
  };

  return graphData;
};

export const convertToGraphDataMonth = (spaceUpdates: IUpdateSpace[]) => {
  const monthData = [] as any[];
  const numDaysInMonth = moment().daysInMonth();

  for (let day = 1; day <= numDaysInMonth; day++) {
    monthData.push({
      value: 0,
      label: moment().date(day).format("D"),
    });
  }

  let maxValue = 0;
  spaceUpdates.forEach((element: IUpdateSpace) => {
    const dayOfMonth = moment(element.collectTime).date();
    monthData[dayOfMonth - 1].value += parseFloat(
      (element.dataItemMap.inverter_power || 0).toFixed(1)
    );
    maxValue = Math.max(maxValue, monthData[dayOfMonth - 1].value);
  });

  const graphData = {
    month: { data: monthData },
    maxValue: maxValue * 1.25,
  };

  return graphData;
};

export const convertToGraphDataYear = (spaceUpdates: IUpdateSpace[]) => {
  const yearData = Array.from({ length: 12 }, (_, index) => ({
    value: 0,
    label: moment().month(index).format("MMM"),
  }));

  let maxValue = 0;
  spaceUpdates.forEach((element: IUpdateSpace) => {
    const monthOfYear = moment(element.collectTime).month();
    yearData[monthOfYear].value += parseFloat(
      (element.dataItemMap.inverter_power || 0).toFixed(1)
    );
    maxValue = Math.max(maxValue, yearData[monthOfYear].value);
  });

  const graphData = {
    year: { data: yearData },
    maxValue: maxValue * 1.25,
  };

  return graphData;
};
