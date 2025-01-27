"use client";
import React, { useState } from "react";
import { Input, Select, DatePicker, Table, Modal, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

// Dummy data for registration requests
const dummyRequests = Array.from({ length: 15 }, (_, i) => ({
  key: i + 1,
  name: `Business ${i + 1}`,
  dateApplied: dayjs()
    .subtract(Math.floor(Math.random() * 30), "days")
    .format("YYYY-MM-DD"),
  location: `Location ${i + 1}`,
  salesRep: `Rep ${Math.floor(Math.random() * 5) + 1}`,
  priceGroup: `Group ${Math.floor(Math.random() * 3) + 1}`,
  status: i % 3 === 0 ? "Approved" : i % 2 === 0 ? "Rejected" : "New",
}));

// Interface for registration requests
interface RegistrationRequest {
  key: number;
  name: string;
  dateApplied: string;
  location: string;
  salesRep: string;
  priceGroup: string;
  status: string;
}

export default function RegistrationRequestPage() {
  const [filteredData, setFilteredData] = useState(dummyRequests);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [salesRepFilter, setSalesRepFilter] = useState<string | null>(null);
  const [priceGroupFilter, setPriceGroupFilter] = useState<string | null>(null);
  // const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] =
    useState<RegistrationRequest | null>(null);

  // Handle search
  const handleSearch = (value: string) => {
    setSearchText(value);
    applyFilters(value, dateRange, salesRepFilter, priceGroupFilter);
  };

  // Handle date range filter
  const handleDateRangeChange = (
    dates: [Dayjs | null, Dayjs | null] | null,
  ) => {
    if (dates && dates[0] && dates[1]) {
      setDateRange([dates[0], dates[1]]);
      applyFilters(searchText, [dates[0], dates[1]], salesRepFilter, priceGroupFilter);
    } else {
      setDateRange(null);
      applyFilters(searchText, null, salesRepFilter, priceGroupFilter);
    }
  };

  // Handle sales rep filter
  const handleSalesRepFilter = (value: string) => {
    setSalesRepFilter(value);
    applyFilters(searchText, dateRange, value, priceGroupFilter);
  };

  // Handle price group filter
  const handlePriceGroupFilter = (value: string) => {
    setPriceGroupFilter(value);
    applyFilters(searchText, dateRange, salesRepFilter, value);
  };

  // Handle status filter
  // const handleStatusFilter = (value: string) => {
  //   setStatusFilter(value);
  //   applyFilters(searchText, dateRange, salesRepFilter, priceGroupFilter, value);
  // };

  // Apply all filters
  const applyFilters = (
    search: string,
    dates: [Dayjs, Dayjs] | null,
    salesRep: string | null,
    priceGroup: string | null,
    // status: string | null
  ) => {
    let filtered = dummyRequests;

    // Search by name
    if (search) {
      filtered = filtered.filter((request) =>
        request.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by date range
    if (dates) {
      const [start, end] = dates;
      filtered = filtered.filter((request) =>
        dayjs(request.dateApplied).isBetween(start, end, "day", "[]")
      );
    }

    // Filter by sales rep
    if (salesRep) {
      filtered = filtered.filter((request) => request.salesRep === salesRep);
    }

    // Filter by price group
    if (priceGroup) {
      filtered = filtered.filter((request) => request.priceGroup === priceGroup);
    }

    // Filter by status
    if (status) {
      filtered = filtered.filter((request) => request.status === status);
    }

    setFilteredData(filtered);
  };

  // Handle view application
  const handleViewApplication = (request: RegistrationRequest) => {
    setSelectedRequest(request);
    setIsModalVisible(true);
  };

  // Handle approve/reject
  const handleApprove = () => {
    // Update the status of the selected request to "Approved"
    const updatedData = filteredData.map((request) =>
      request.key === selectedRequest?.key
        ? { ...request, status: "Approved" }
        : request
    );
    setFilteredData(updatedData);
    setIsModalVisible(false);
  };

  const handleReject = () => {
    // Update the status of the selected request to "Rejected"
    const updatedData = filteredData.map((request) =>
      request.key === selectedRequest?.key
        ? { ...request, status: "Rejected" }
        : request
    );
    setFilteredData(updatedData);
    setIsModalVisible(false);
  };

  // Table columns
  const columns: ColumnsType<RegistrationRequest> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date Applied",
      dataIndex: "dateApplied",
      key: "dateApplied",
      sorter: (a, b) => dayjs(a.dateApplied).unix() - dayjs(b.dateApplied).unix(),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => handleViewApplication(record)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6 bg-neutral-100 dark:bg-neutral-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-neutral-800 dark:text-neutral-200">
        Registration Requests
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
        {/* <Select
          placeholder="Filter by Status"
          options={[
            { value: "New", label: "New" },
            { value: "Approved", label: "Approved" },
            { value: "Rejected", label: "Rejected" },
          ]}
          onChange={handleStatusFilter}
          className="w-full md:w-64"
        /> */}
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
      />

      {/* Modal for viewing application details */}
      <Modal
        title="Application Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="reject" danger onClick={handleReject}>
            Reject
          </Button>,
          <Button key="approve" type="primary" onClick={handleApprove}>
            Approve
          </Button>,
        ]}
      >
        {selectedRequest && (
          <div>
            <p>
              <strong>Name:</strong> {selectedRequest.name}
            </p>
            <p>
              <strong>Location:</strong> {selectedRequest.location}
            </p>
            <p>
              <strong>Sales Rep:</strong> {selectedRequest.salesRep}
            </p>
            <p>
              <strong>Price Group:</strong> {selectedRequest.priceGroup}
            </p>
            <p>
              <strong>Business Details:</strong> Registration certificates and
              other documents can be displayed here.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}