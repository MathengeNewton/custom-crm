// components/ChartsSection.tsx
import React from "react";
import { BarChartComponent } from "./BarChartComponent";
import { LineChartComponent } from "./LineChartComponent";
import { PieChartComponent } from "./PieChartComponent";

export const ChartsSection = ({
  clientsData,
  salesData,
  ordersData,
  salesRepsData,
  messagesData,
  campaignsData,
}: {
  clientsData: unknown;
  salesData: unknown;
  ordersData: unknown;
  salesRepsData: unknown;
  messagesData: unknown;
  campaignsData: unknown;
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