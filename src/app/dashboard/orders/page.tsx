"use client";
import React, { useState } from "react";
import { Table, Button, Card, Radio, Space, Tag } from "antd";
import {
  EditOutlined,
  CheckCircleOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";

// Define Order type
type Order = {
  key: number;
  orderNumber: string;
  client: string;
  status: string;
  details: string;
};

// Dummy data for orders
const dummyOrders: Order[] = Array.from({ length: 10 }, (_, i) => ({
  key: i + 1,
  orderNumber: `ORD${1000 + i}`,
  client: `Client ${i + 1}`,
  status: i % 3 === 0 ? "New" : i % 3 === 1 ? "Partially Dispatched" : "Dispatched",
  details: `Order details for ORD${1000 + i}`,
}));

// Order status colors
const statusColors = {
  New: "red",
  "Partially Dispatched": "orange",
  Dispatched: "green",
};

export default function OrdersPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // Handle dispatch action
  const handleDispatch = (orderNumber: string) => {
    console.log(`Dispatching order: ${orderNumber}`);
    // Add your dispatch logic here
  };

  // Handle edit action
  const handleEdit = (orderNumber: string) => {
    console.log(`Editing order: ${orderNumber}`);
    // Add your edit logic here
  };

  // List View Columns
  const listColumns = [
    {
      title: "Order Number",
      dataIndex: "orderNumber",
      key: "orderNumber",
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={statusColors[status as keyof typeof statusColors]}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record: Order) => (
        <Space>
          <Button
            type="default"
            icon={<InfoCircleOutlined />}
            // onClick={() => handleEdit(record.orderNumber)}
          >
            View
          </Button>
         
          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.orderNumber)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={() => handleDispatch(record.orderNumber)}
          >
            Dispatch
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-neutral-100 dark:bg-neutral-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-neutral-800 dark:text-neutral-200">
        Orders Processing
      </h1>

      {/* Toggle for List/Grid View */}
      <div className="mb-6">
        <Radio.Group
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
          buttonStyle="solid"
        >
          <Radio.Button value="list">
            <UnorderedListOutlined /> 
          </Radio.Button>
          <Radio.Button value="grid">
            <AppstoreOutlined /> 
          </Radio.Button>
        </Radio.Group>
      </div>

      {/* List View */}
      {viewMode === "list" && (
        <Table
          columns={listColumns}
          dataSource={dummyOrders}
          pagination={{ pageSize: 10 }}
          scroll={{ x: true }}
        />
      )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyOrders.map((order) => (
            <Card
              key={order.key}
              className="shadow-lg"
              style={{
                borderLeft: `6px solid ${
                  statusColors[order.status as keyof typeof statusColors]
                }`,
              }}
            >
              <div className="flex flex-col space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{order.orderNumber}</h3>
                  <p className="text-sm text-gray-600">{order.client}</p>
                </div>
                <div>
                  <Tag color={statusColors[order.status as keyof typeof statusColors]}>
                    {order.status}
                  </Tag>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{order.details}</p>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    // type=""
                    icon={<InfoCircleOutlined />}
                    // onClick={() => handleDispatch(order.orderNumber)}
                  >
                    View
                  </Button>
                 
                  <Button
                    type="default"
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(order.orderNumber)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    onClick={() => handleDispatch(order.orderNumber)}
                  >
                    Dispatch
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}