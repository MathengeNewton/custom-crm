// components/PieChartComponent.tsx
import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

import { ChartData } from "chart.js";

export const PieChartComponent = ({ data, title }: { data: ChartData<"pie", number[], unknown>; title: string }) => {
  return (
    <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200 mb-4">
        {title}
      </h2>
      <Pie data={data} />
    </div>
  );
};