"use client";
import React, { useState } from "react";
import { Input, Select, DatePicker, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

// Dummy data for clients
const dummyClients = Array.from({ length: 15 }, (_, i) => ({
  key: i + 1,
  name: `Business ${i + 1}`,
  dateJoined: dayjs()
    .subtract(Math.floor(Math.random() * 365), "days")
    .format("YYYY-MM-DD"),
  salesRep: `Rep ${Math.floor(Math.random() * 5) + 1}`,
  priceGroup: `Group ${Math.floor(Math.random() * 3) + 1}`,
  totalOrders: Math.floor(Math.random() * 100),
  totalOrderPrice: Math.floor(Math.random() * 100000),
  status: i % 3 === 0 ? "Approved" : i % 2 === 0 ? "Rejected" : "New", // Add status field
}));

// Table columns
interface Client {
  key: number;
  name: string;
  dateJoined: string;
  salesRep: string;
  priceGroup: string;
  totalOrders: number;
  totalOrderPrice: number;
  status: string; // Add status to the interface
}

const columns: ColumnsType<Client> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Date Joined",
    dataIndex: "dateJoined",
    key: "dateJoined",
    sorter: (a, b) => dayjs(a.dateJoined).unix() - dayjs(b.dateJoined).unix(),
  },
  {
    title: "Sales Rep",
    dataIndex: "salesRep",
    key: "salesRep",
    filters: [
      { text: "Rep 1", value: "Rep 1" },
      { text: "Rep 2", value: "Rep 2" },
      { text: "Rep 3", value: "Rep 3" },
      { text: "Rep 4", value: "Rep 4" },
      { text: "Rep 5", value: "Rep 5" },
    ],
    onFilter: (value, record) => record.salesRep === value,
  },
  {
    title: "Price Group",
    dataIndex: "priceGroup",
    key: "priceGroup",
    filters: [
      { text: "Group 1", value: "Group 1" },
      { text: "Group 2", value: "Group 2" },
      { text: "Group 3", value: "Group 3" },
    ],
    onFilter: (value, record) => record.priceGroup === value,
  },
  {
    title: "Total Orders",
    dataIndex: "totalOrders",
    key: "totalOrders",
    sorter: (a, b) => a.totalOrders - b.totalOrders,
  },
  {
    title: "Total Order Price",
    dataIndex: "totalOrderPrice",
    key: "totalOrderPrice",
    sorter: (a, b) => a.totalOrderPrice - b.totalOrderPrice,
    render: (value) => `Ksh ${value.toLocaleString()}`,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    filters: [
      { text: "New", value: "New" },
      { text: "Approved", value: "Approved" },
      { text: "Rejected", value: "Rejected" },
    ],
    onFilter: (value, record) => record.status === value,
    render: (status: string) => {
      let color = "default";
      if (status === "New") {
        color = "red";
      } else if (status === "Approved") {
        color = "green";
      } else if (status === "Rejected") {
        color = "red";
      }
      return <Tag color={color}>{status}</Tag>;
    },
  },
];

export default function ClientsPage() {
  const [filteredData, setFilteredData] = useState(dummyClients);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [salesRepFilter, setSalesRepFilter] = useState<string | null>(null);
  const [priceGroupFilter, setPriceGroupFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Handle search
  const handleSearch = (value: string) => {
    setSearchText(value);
    applyFilters(value, dateRange, salesRepFilter, priceGroupFilter, statusFilter);
  };

  // Handle date range filter
  const handleDateRangeChange = (
    dates: [Dayjs | null, Dayjs | null] | null,
  ) => {
    if (dates && dates[0] && dates[1]) {
      setDateRange([dates[0], dates[1]]);
      applyFilters(searchText, [dates[0], dates[1]], salesRepFilter, priceGroupFilter, statusFilter);
    } else {
      setDateRange(null);
      applyFilters(searchText, null, salesRepFilter, priceGroupFilter, statusFilter);
    }
  };

  // Handle sales rep filter
  const handleSalesRepFilter = (value: string) => {
    setSalesRepFilter(value);
    applyFilters(searchText, dateRange, value, priceGroupFilter, statusFilter);
  };

  // Handle price group filter
  const handlePriceGroupFilter = (value: string) => {
    setPriceGroupFilter(value);
    applyFilters(searchText, dateRange, salesRepFilter, value, statusFilter);
  };

  // Handle status filter
  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    applyFilters(searchText, dateRange, salesRepFilter, priceGroupFilter, value);
  };

  // Apply all filters
  const applyFilters = (
    search: string,
    dates: [Dayjs, Dayjs] | null,
    salesRep: string | null,
    priceGroup: string | null,
    status: string | null
  ) => {
    let filtered = dummyClients;

    // Search by name
    if (search) {
      filtered = filtered.filter((client) =>
        client.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by date range
    if (dates) {
      const [start, end] = dates;
      filtered = filtered.filter((client) =>
        dayjs(client.dateJoined).isBetween(start, end, "day", "[]")
      );
    }

    // Filter by sales rep
    if (salesRep) {
      filtered = filtered.filter((client) => client.salesRep === salesRep);
    }

    // Filter by price group
    if (priceGroup) {
      filtered = filtered.filter((client) => client.priceGroup === priceGroup);
    }

    // Filter by status
    if (status) {
      filtered = filtered.filter((client) => client.status === status);
    }

    setFilteredData(filtered);
  };

  return (
    <div className="p-6 bg-neutral-100 dark:bg-neutral-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-neutral-800 dark:text-neutral-200">
        Clients Data
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
          placeholder="Filter by Sales Rep"
          options={[
            { value: "Rep 1", label: "Rep 1" },
            { value: "Rep 2", label: "Rep 2" },
            { value: "Rep 3", label: "Rep 3" },
            { value: "Rep 4", label: "Rep 4" },
            { value: "Rep 5", label: "Rep 5" },
          ]}
          onChange={handleSalesRepFilter}
          className="w-full md:w-64"
        />
        <Select
          placeholder="Filter by Price Group"
          options={[
            { value: "Group 1", label: "Group 1" },
            { value: "Group 2", label: "Group 2" },
            { value: "Group 3", label: "Group 3" },
          ]}
          onChange={handlePriceGroupFilter}
          className="w-full md:w-64"
        />
        <Select
          placeholder="Filter by Status"
          options={[
            { value: "New", label: "New" },
            { value: "Approved", label: "Approved" },
            { value: "Rejected", label: "Rejected" },
          ]}
          onChange={handleStatusFilter}
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
    </div>
  );
}