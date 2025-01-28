"use client";

import React, { useState } from "react";
import {
  Table,
  Button,
  Input,
  Modal,
  DatePicker,
  Select
} from "antd";
import {
  PlusOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

// Define types for campaigns and message groups
type Campaign = {
  key: number;
  code: string;
  messageGroup: string;
  recipientCount: number;
  status: "Active" | "Passed";
};

type MessageGroup = {
  key: number;
  name: string;
  recipientCount: number;
};

const dummyCampaigns: Campaign[] = [
  {
    key: 1,
    code: "CAMP123",
    messageGroup: "Christmas Sale",
    recipientCount: 50,
    status: "Active",
  },
  {
    key: 2,
    code: "CAMP124",
    messageGroup: "Easter Sale",
    recipientCount: 30,
    status: "Passed",
  },
];

const messageGroups: MessageGroup[] = [
  { key: 1, name: "Christmas Sale", recipientCount: 50 },
  { key: 2, name: "Easter Sale", recipientCount: 30 },
  { key: 3, name: "Black Friday Deals", recipientCount: 80 },
];

export default function CampaignsPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [newCampaign, setNewCampaign] = useState<{
    messageGroup: string;
    message: string;
    scheduleDate: string | null;
  }>({
    messageGroup: "",
    message: "",
    scheduleDate: null,
  });
  
  const [smsBalance] = useState(1000);

  const columns: ColumnsType<Campaign> = [
    {
      title: "Campaign Code",
      dataIndex: "code",
      key: "code",
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Message Group",
      dataIndex: "messageGroup",
      key: "messageGroup",
    },
    {
      title: "Recipient Count",
      dataIndex: "recipientCount",
      key: "recipientCount",
      sorter: (a, b) => a.recipientCount - b.recipientCount,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Active", value: "Active" },
        { text: "Passed", value: "Passed" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => setSelectedCampaign(record)}
        >
          View Campaign
        </Button>
      ),
    },
  ];

  const handleCreateCampaign = () => {
    console.log("New Campaign:", newCampaign);
    // Add logic to save the new campaign
    setIsModalVisible(false);
    setNewCampaign({ messageGroup: "", message: "", scheduleDate: null });
  };

  return (
    <div className="p-6 bg-neutral-100 dark:bg-neutral-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
          Campaigns
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-lg">SMS Balance: {smsBalance}</span>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            Create Campaign
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={dummyCampaigns}
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
      />

      {/* Create Campaign Modal */}
      <Modal
        title="Create Campaign"
        visible={isModalVisible}
        onOk={handleCreateCampaign}
        onCancel={() => setIsModalVisible(false)}
        okText="Create"
        width={600}
      >
        <div className="space-y-4">
          <Select
            placeholder="Select Message Group"
            value={newCampaign.messageGroup}
            onChange={(value) =>
              setNewCampaign((prev) => ({ ...prev, messageGroup: value }))
            }
            className="w-full"
          >
            {messageGroups.map((group) => (
              <Select.Option key={group.key} value={group.name}>
                {group.name} ({group.recipientCount} recipients)
              </Select.Option>
            ))}
          </Select>
          <Input.TextArea
            placeholder="Enter Message Details"
            rows={4}
            value={newCampaign.message}
            onChange={(e) =>
              setNewCampaign((prev) => ({ ...prev, message: e.target.value }))
            }
          />
          <DatePicker
            placeholder="Schedule Date (optional)"
            className="w-full"
            value={newCampaign.scheduleDate ? dayjs(newCampaign.scheduleDate) : null}
            onChange={(date) =>
              setNewCampaign((prev) => ({ ...prev, scheduleDate: date?.toISOString() || null }))
            }
          />
        </div>
      </Modal>

      {/* View Campaign Modal */}
      <Modal
        title="View Campaign"
        visible={!!selectedCampaign}
        onOk={() => setSelectedCampaign(null)}
        onCancel={() => setSelectedCampaign(null)}
        footer={null}
        width={600}
      >
        {selectedCampaign && (
          <div className="space-y-4">
            <p>
              <strong>Campaign Code:</strong> {selectedCampaign.code}
            </p>
            <p>
              <strong>Message Group:</strong> {selectedCampaign.messageGroup}
            </p>
            <p>
              <strong>Recipient Count:</strong> {selectedCampaign.recipientCount}
            </p>
            <p>
              <strong>Status:</strong> {selectedCampaign.status}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
