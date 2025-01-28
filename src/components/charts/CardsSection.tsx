// components/CardsSection.tsx
import React from "react";

export const CardsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">
          New Clients
        </h2>
        <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          144
        </p>
      </div>
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">
          Active Clients
        </h2>
        <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          1,456
        </p>
      </div>
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">
          Total Sales
        </h2>
        <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Ksh 123,456
        </p>
      </div>
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">
          Orders Received
        </h2>
        <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          567
        </p>
      </div>
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">
          Orders Fulfilled
        </h2>
        <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          543
        </p>
      </div>
    </div>
  );
};