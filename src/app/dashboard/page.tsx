'use client'
// app/dashboard/page.tsx
import React from "react";
import { CardsSection } from "@/components/charts/CardsSection";
import { ChartsSection } from "@/components/charts/ChartsSection";

export default function DashboardPage() {
  // Dummy data for the dashboard
  const clientsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Clients",
        data: [50, 60, 70, 80, 90, 100, 110],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Sales (Ksh)",
        data: [5000, 6000, 7000, 8000, 9000, 10000, 11000],
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const ordersData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Orders Received",
        data: [100, 120, 130, 140, 150, 160, 170],
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
      {
        label: "Orders Fulfilled",
        data: [90, 110, 120, 130, 140, 150, 160],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const salesRepsData = {
    labels: ["John", "Jane", "Mike", "Sarah", "Tom"],
    datasets: [
      {
        label: "Sales Reps Performance",
        data: [12000, 19000, 3000, 5000, 2000],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const messagesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Messages Sent",
        data: [200, 300, 400, 500, 600, 700, 800],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const campaignsData = {
    labels: ["Campaign 1", "Campaign 2", "Campaign 3", "Campaign 4"],
    datasets: [
      {
        label: "Campaigns Run",
        data: [50, 60, 70, 80],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 bg-neutral-100 dark:bg-neutral-900 min-h-screen w-full">
    <h1 className="text-2xl font-bold mb-6 text-neutral-800 dark:text-neutral-200">
      Dashboard Overview
    </h1>
    <CardsSection />
    <ChartsSection
      clientsData={clientsData}
      salesData={salesData}
      ordersData={ordersData}
      salesRepsData={salesRepsData}
      messagesData={messagesData}
      campaignsData={campaignsData}
    />
  </div>
  );
}