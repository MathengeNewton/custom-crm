"use client";
import React, { useState } from "react";
import { Table, Button, Card, Radio, Space, Tag, Modal, List, Input, InputNumber, Popconfirm } from "antd";
import {
  EditOutlined,
  CheckCircleOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

// Define Order and Item types
type Item = {
  id: number;
  name: string;
  quantity: number;
};

type Order = {
  key: number;
  orderNumber: string;
  client: string;
  status: string;
  details: string;
  items: Item[];
  timePlaced: string;
};

// Dummy data for available items
const dummyItems: Item[] = [
  { id: 1, name: "Wine A", quantity: 10 },
  { id: 2, name: "Spirit B", quantity: 5 },
  { id: 3, name: "Wine C", quantity: 8 },
  { id: 4, name: "Spirit D", quantity: 3 },
  { id: 5, name: "Wine E", quantity: 12 },
  { id: 6, name: "Spirit F", quantity: 7 },
];

// Generate random orders with random items
const generateRandomOrders = (count: number): Order[] => {
  return Array.from({ length: count }, (_, i) => ({
    key: i + 1,
    orderNumber: `ORD${1000 + i}`,
    client: `Client ${i + 1}`,
    status: i % 3 === 0 ? "New" : i % 3 === 1 ? "Partially Dispatched" : "Dispatched",
    details: `Order details for ORD${1000 + i}`,
    items: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, j) => ({
      id: dummyItems[j % dummyItems.length].id,
      name: dummyItems[j % dummyItems.length].name,
      quantity: Math.floor(Math.random() * 10) + 1,
    })),
    timePlaced: new Date().toLocaleString(),
  }));
};

const dummyOrders: Order[] = generateRandomOrders(10);

// Order status colors
const statusColors = {
  New: "red",
  "Partially Dispatched": "orange",
  Dispatched: "green",
};

export default function OrdersPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editItems, setEditItems] = useState<Item[]>([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState(1);

  // Handle dispatch action
  const handleDispatch = (orderNumber: string) => {
    console.log(`Dispatching order: ${orderNumber}`);
    // Add your dispatch logic here
  };

  // Handle view action
  const handleView = (order: Order) => {
    setSelectedOrder(order);
    setIsViewModalVisible(true);
  };

  // Handle edit action
  const handleEdit = (order: Order) => {
    setSelectedOrder(order);
    setEditItems([...order.items]);
    setIsEditModalVisible(true);
  };

  // Handle save action
  const handleSave = () => {
    if (selectedOrder) {
      const updatedOrders = dummyOrders.map((order) =>
        order.key === selectedOrder.key ? { ...order, items: editItems } : order
      );
      console.log("Updated Orders:", updatedOrders);
      setIsEditModalVisible(false);
    }
  };

  // Handle adding a new item
  const handleAddItem = () => {
    if (newItemName && newItemQuantity > 0) {
      const newItem = {
        id: Date.now(), // Temporary unique ID
        name: newItemName,
        quantity: newItemQuantity,
      };
      setEditItems([...editItems, newItem]);
      setNewItemName("");
      setNewItemQuantity(1);
    }
  };

  // Handle updating item quantity
  const handleUpdateQuantity = (id: number, quantity: number) => {
    const updatedItems = editItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setEditItems(updatedItems);
  };

  // Handle removing an item
  const handleRemoveItem = (id: number) => {
    const updatedItems = editItems.filter((item) => item.id !== id);
    setEditItems(updatedItems);
  };

  // List View Columns
  // const listColumns = [
  //   {
  //     title: "Order Number",
  //     dataIndex: "orderNumber",
  //     key: "orderNumber",
  //   },
  //   {
  //     title: "Client",
  //     dataIndex: "client",
  //     key: "client",
  //   },
  //   {
  //     title: "Item Count",
  //     key: "itemCount",
  //     render: (_, record: Order) => record.items.length,
  //   },
  //   {
  //     title: "Time Placed",
  //     dataIndex: "timePlaced",
  //     key: "timePlaced",
  //   },
  //   {
  //     title: "Status",
  //     dataIndex: "status",
  //     key: "status",
  //     render: (status: string) => (
  //       <Tag color={statusColors[status as keyof typeof statusColors]}>{status}</Tag>
  //     ),
  //   },
  //   {
  //     title: "Actions",
  //     key: "actions",
  //     render: (_, record: Order) => (
  //       <Space>
  //         <Button
  //           type="default"
  //           icon={<InfoCircleOutlined />}
  //           onClick={() => handleView(record)}
  //         >
  //           View
  //         </Button>
  //         <Button
  //           type="default"
  //           icon={<EditOutlined />}
  //           onClick={() => handleEdit(record)}
  //           disabled={record.status === "Dispatched"} // Disable if dispatched
  //           style={{ opacity: record.status === "Dispatched" ? 0.5 : 1 }}
  //         >
  //           Edit
  //         </Button>
  //         <Button
  //           type="primary"
  //           icon={<CheckCircleOutlined />}
  //           onClick={() => handleDispatch(record.orderNumber)}
  //           disabled={record.status === "Dispatched"} // Disable if dispatched
  //           style={{ opacity: record.status === "Dispatched" ? 0.5 : 1 }}
  //         >
  //           Dispatch
  //         </Button>
  //       </Space>
  //     ),
  //   },
  // ];
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
      title: "Item Count",
      key: "itemCount",
      render: (_: unknown, record: Order) => record.items.length, // Explicitly typed '_'
    },
    {
      title: "Time Placed",
      dataIndex: "timePlaced",
      key: "timePlaced",
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
      render: (_: unknown, record: Order) => ( // Explicitly typed '_'
        <Space>
          <Button
            type="default"
            icon={<InfoCircleOutlined />}
            onClick={() => handleView(record)}
          >
            View
          </Button>
          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            disabled={record.status === "Dispatched"} // Disable if dispatched
            style={{ opacity: record.status === "Dispatched" ? 0.5 : 1 }}
          >
            Edit
          </Button>
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={() => handleDispatch(record.orderNumber)}
            disabled={record.status === "Dispatched"} // Disable if dispatched
            style={{ opacity: record.status === "Dispatched" ? 0.5 : 1 }}
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
                  <p className="text-sm text-gray-600">Items: {order.items.length}</p>
                  <p className="text-sm text-gray-600">Placed: {order.timePlaced}</p>
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
                    type="default"
                    icon={<InfoCircleOutlined />}
                    onClick={() => handleView(order)}
                  >
                    View
                  </Button>
                  <Button
                    type="default"
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(order)}
                    disabled={order.status === "Dispatched"} // Disable if dispatched
                    style={{ opacity: order.status === "Dispatched" ? 0.5 : 1 }} // Optional visual feedback
                 
                  >
                    Edit
                  </Button>
                  <Button
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    onClick={() => handleDispatch(order.orderNumber)}
                    disabled={order.status === "Dispatched"} // Disable if dispatched
                    style={{ opacity: order.status === "Dispatched" ? 0.5 : 1 }}
                  >
                    Dispatch
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* View Modal */}
      <Modal
        title="View Order"
        visible={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        footer={null}
      >
        <List
          dataSource={selectedOrder?.items || []}
          renderItem={(item) => (
            <List.Item>
              {item.name} (Quantity: {item.quantity})
            </List.Item>
          )}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Edit Order"
        visible={isEditModalVisible}
        onOk={handleSave}
        onCancel={() => setIsEditModalVisible(false)}
        width={800}
      >
        <div className="space-y-4">
          {/* Add New Item Section */}
          <div className="flex space-x-2">
            <Input
              placeholder="Product Name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
            <InputNumber
              min={1}
              value={newItemQuantity}
              onChange={(value) => setNewItemQuantity(value || 1)}
            />
            <Button type="primary" onClick={handleAddItem}>
              Add Item
            </Button>
          </div>

          {/* List of Items */}
          <List
            dataSource={editItems}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                actions={[
                  <InputNumber
                  key={item.id}
                    min={1}
                    value={item.quantity}
                    onChange={(value) => handleUpdateQuantity(item.id, value || 1)}
                  />,
                  <Popconfirm
                  key={item.id}
                    title="Are you sure you want to remove this item?"
                    onConfirm={() => handleRemoveItem(item.id)}
                  >
                    <Button type="text" danger icon={<DeleteOutlined />} />
                  </Popconfirm>,
                ]}
              >
                {item.name}
              </List.Item>
            )}
          />
        </div>
      </Modal>
    </div>
  );
}