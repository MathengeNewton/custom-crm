import React from "react";
import { BarChartComponent } from "./BarChartComponent";
import { LineChartComponent } from "./LineChartComponent";
import { PieChartComponent } from "./PieChartComponent";
import { ChartData } from "chart.js";

export const ChartsSection = ({
  clientsData,
  salesData,
  ordersData,
  salesRepsData,
  messagesData,
  campaignsData,
}: {
  clientsData: ChartData<"bar", (number | [number, number] | null)[], unknown>;
  salesData: ChartData<"line", (number | { x: number; y: number } | null)[], unknown>; // Updated
  ordersData: ChartData<"bar", (number | [number, number] | null)[], unknown>;
  salesRepsData: ChartData<"pie", number[], unknown>;
  messagesData: ChartData<"line", (number | { x: number; y: number } | null)[], unknown>; // Updated
  campaignsData: ChartData<"pie", number[], unknown>;
}) => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <BarChartComponent data={clientsData} title="Clients Over Time" />
        <LineChartComponent data={salesData} title="Sales Over Time" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <BarChartComponent data={ordersData} title="Orders Received vs Fulfilled" />
        <LineChartComponent data={messagesData} title="Messages Sent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PieChartComponent data={salesRepsData} title="Sales Reps Performance" />
        <PieChartComponent data={campaignsData} title="Campaigns Run" />
      </div>
    </>
  );
};
