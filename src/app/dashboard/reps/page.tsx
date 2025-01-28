"use client";
import React, { useState } from "react";
import { Input, Select, DatePicker, Table, Button, Form, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

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

export default function SalesRepsPage() {
  const [filteredData, setFilteredData] = useState(dummySalesReps);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<SalesRep | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [createForm] = Form.useForm();

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

  // Handle edit action
  const handleEdit = (record: SalesRep) => {
    setSelectedRecord(record);
    form.setFieldsValue(record); // Set form values to the selected record
    setIsModalVisible(true);
  };

  // Handle update
  const handleUpdate = () => {
    form.validateFields().then((values) => {
      const updatedData = filteredData.map((rep) =>
        rep.key === selectedRecord?.key ? { ...rep, ...values } : rep
      );
      setFilteredData(updatedData);
      setIsModalVisible(false);
    });
  };

  // Handle deactivate
  const handleDeactivate = () => {
    const updatedData = filteredData.filter((rep) => rep.key !== selectedRecord?.key);
    setFilteredData(updatedData);
    setIsModalVisible(false);
  };

  // Handle create action
  const handleCreate = () => {
    setIsCreateModalVisible(true);
  };

  // Handle create submission
  const handleCreateSubmit = () => {
    createForm.validateFields().then((values) => {
      const newRecord = {
        key: filteredData.length + 1, // Generate a new key
        ...values,
        dateJoined: dayjs().format("YYYY-MM-DD"), // Set the current date as the joined date
      };
      setFilteredData([...filteredData, newRecord]);
      setIsCreateModalVisible(false);
      createForm.resetFields(); // Reset the form fields
    });
  };

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
      render: (_, record) => (
        <Button onClick={() => handleEdit(record)}>View</Button>
      ),
    },
  ];

  return (
    <div className="p-6 bg-neutral-100 dark:bg-neutral-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-neutral-800 dark:text-neutral-200">
        Sales Reps
      </h1>

      {/* Filters and Create Button */}
      <div className="flex flex-wrap justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-4">
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
        <Button type="primary" onClick={handleCreate}>
          Create
        </Button>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
      />

      {/* Modal for Edit/Deactivate */}
      <Modal
        title="Edit/Deactivate Sales Rep"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="deactivate" danger onClick={handleDeactivate}>
            Deactivate
          </Button>,
          <Button key="update" type="primary" onClick={handleUpdate}>
            Update
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Phone Number">
            <Input />
          </Form.Item>
          <Form.Item name="locationServing" label="Location Serving">
            <Input />
          </Form.Item>
          <Form.Item name="clientsOnboarded" label="Clients Onboarded">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="dateJoined" label="Date Joined">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal for Create */}
      <Modal
        title="Create Sales Rep"
        visible={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsCreateModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="create" type="primary" onClick={handleCreateSubmit}>
            Create
          </Button>,
        ]}
      >
        <Form form={createForm} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[{ required: true, message: "Please enter the phone number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="locationServing"
            label="Location Serving"
            rules={[{ required: true, message: "Please enter the location" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}