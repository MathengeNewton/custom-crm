"use client";
import React, { useState } from "react";
import { Input, Select, DatePicker, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import EditDeleteModal from "@/components/EditDeleteModal"; // Reusable modal

dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

// Dummy data for sales reps
const dummySalesReps = Array.from({ length: 15 }, (_, i) => ({
  key: i + 1,
  name: `Sales Rep ${i + 1}`,
  phoneNumber: `+2547${Math.floor(Math.random() * 100000000)}`, // Random Kenyan phone number
  locationServing: `Location ${Math.floor(Math.random() * 5) + 1}`,
  clientsOnboarded: Math.floor(Math.random() * 100),
  dateJoined: dayjs()
    .subtract(Math.floor(Math.random() * 365), "days")
    .format("YYYY-MM-DD"),
}));

// Table columns
interface SalesRep {
  key: number;
  name: string;
  phoneNumber: string;
  locationServing: string;
  clientsOnboarded: number;
  dateJoined: string;
  [key: string]: unknown;
}

const columns: ColumnsType<SalesRep> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Location Serving",
    dataIndex: "locationServing",
    key: "locationServing",
    filters: [
      { text: "Location 1", value: "Location 1" },
      { text: "Location 2", value: "Location 2" },
      { text: "Location 3", value: "Location 3" },
      { text: "Location 4", value: "Location 4" },
      { text: "Location 5", value: "Location 5" },
    ],
    onFilter: (value, record) => record.locationServing === value,
  },
  {
    title: "Clients Onboarded",
    dataIndex: "clientsOnboarded",
    key: "clientsOnboarded",
    sorter: (a, b) => a.clientsOnboarded - b.clientsOnboarded,
  },
  {
    title: "Date Joined",
    dataIndex: "dateJoined",
    key: "dateJoined",
    sorter: (a, b) => dayjs(a.dateJoined).unix() - dayjs(b.dateJoined).unix(),
  },
  {
    title: "Actions",
    key: "actions",
    // render: (_, record) => (
    //   <Button onClick={() => handleEditDelete(record)}>Edit/Delete</Button>
    // ),
  },
];

export default function SalesRepsPage() {
  const [filteredData, setFilteredData] = useState(dummySalesReps);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const [selectedRecord] = useState<SalesRep | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Handle search
  const handleSearch = (value: string) => {
    setSearchText(value);
    applyFilters(value, dateRange, locationFilter);
  };

  // Handle date range filter
  const handleDateRangeChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates && dates[0] && dates[1]) {
      setDateRange([dates[0], dates[1]]);
      applyFilters(searchText, [dates[0], dates[1]], locationFilter);
    } else {
      setDateRange(null);
      applyFilters(searchText, null, locationFilter);
    }
  };

  // Handle location filter
  const handleLocationFilter = (value: string) => {
    setLocationFilter(value);
    applyFilters(searchText, dateRange, value);
  };

  // Apply all filters
  const applyFilters = (
    search: string,
    dates: [Dayjs, Dayjs] | null,
    location: string | null
  ) => {
    let filtered = dummySalesReps;

    // Search by name
    if (search) {
      filtered = filtered.filter((rep) =>
        rep.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by date range
    if (dates) {
      const [start, end] = dates;
      filtered = filtered.filter((rep) =>
        dayjs(rep.dateJoined).isBetween(start, end, "day", "[]")
      );
    }

    // Filter by location
    if (location) {
      filtered = filtered.filter((rep) => rep.locationServing === location);
    }

    setFilteredData(filtered);
  };

  // Handle edit/delete action
  // const handleEditDelete = (record: SalesRep) => {
  //   setSelectedRecord(record);
  //   setIsModalVisible(true);
  // };

  // Handle update
  const handleUpdate = (updatedRecord: SalesRep) => {
    const updatedData = filteredData.map((rep) =>
      rep.key === updatedRecord.key ? updatedRecord : rep
    );
    setFilteredData(updatedData);
  };

  // Handle delete
  const handleDelete = (recordId: number) => {
    const updatedData = filteredData.filter((rep) => rep.key !== recordId);
    setFilteredData(updatedData);
  };

  return (
    <div className="p-6 bg-neutral-100 dark:bg-neutral-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-neutral-800 dark:text-neutral-200">
        Sales Reps
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Input
          placeholder="Search by name"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full md:w-64"
        />
        <RangePicker
          onChange={handleDateRangeChange}
          className="w-full md:w-64"
        />
        <Select
          placeholder="Filter by Location"
          options={[
            { value: "Location 1", label: "Location 1" },
            { value: "Location 2", label: "Location 2" },
            { value: "Location 3", label: "Location 3" },
            { value: "Location 4", label: "Location 4" },
            { value: "Location 5", label: "Location 5" },
          ]}
          onChange={handleLocationFilter}
          className="w-full md:w-64"
        />
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
      />

      {/* Reusable Edit/Delete Modal */}
      {selectedRecord && (
        <EditDeleteModal
          record={selectedRecord}
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}