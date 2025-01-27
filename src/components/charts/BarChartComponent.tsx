// components/BarChartComponent.tsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

import { ChartData } from "chart.js";

export const BarChartComponent = ({ data, title }: { data: ChartData<"bar">; title: string }) => {
  return (
    <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200 mb-4">
        {title}
      </h2>
      <Bar data={data} />
    </div>
  );
};