"use client";
import React, { useState } from "react";
import { Table, Button, Input, Modal, List, InputNumber, Popconfirm, Upload } from "antd";
import { SearchOutlined, EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

// Define types for the group and user
type User = {
  id: number;
  name: string;
};

type Group = {
  key: number;
  name: string;
  description: string;
  memberCount: number;
  recipientCount: number;
  dateCreated: string;
  users: User[];
};

// Dummy data for groups with proper marketing names
const dummyGroups: Group[] = [
    {
        key: 1,
        name: "Christmas Sale",
        description:"sale to clear chrismas stock",
        memberCount: 10,
        recipientCount: 5,
        dateCreated: "2023-10-01",
        users: Array.from({ length: 10 }, (_, i) => ({ id: i + 1, name: `User ${i + 1}` })),
      },
      {
        key: 2,
        name: "Easter Sale",
        memberCount: 15,
        description:"sale to clear chrismas stock",
        recipientCount: 8,
        dateCreated: "2023-09-15",
        users: Array.from({ length: 15 }, (_, i) => ({ id: i + 11, name: `User ${i + 11}` })),
      },
      {
        key: 3,
        name: "Summer Clearance",
        memberCount: 20,
        recipientCount: 12,
        description:"sale to clear chrismas stock",
        dateCreated: "2023-08-20",
        users: Array.from({ length: 20 }, (_, i) => ({ id: i + 26, name: `User ${i + 26}` })),
      },
      {
        key: 4,
        name: "Black Friday Deals",
        memberCount: 25,
        recipientCount: 18,
        description:"sale to clear chrismas stock",
        dateCreated: "2023-11-24",
        users: Array.from({ length: 25 }, (_, i) => ({ id: i + 46, name: `User ${i + 46}` })),
      }
];



export default function MessageGroupsPage() {
//   const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [editedGroup, setEditedGroup] = useState<Group | null>(null);
  const [newGroup, setNewGroup] = useState<Partial<Group>>({});
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  // Handle opening the modal
  const handleOpenModal = (group: Group) => {
    // setSelectedGroup(group);
    setEditedGroup({ ...group }); // Create a copy for editing
    setIsModalVisible(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    // setSelectedGroup(null);
    setEditedGroup(null);
    setNewUserName("");
  };

  // Handle saving changes
  const handleSave = () => {
    if (editedGroup) {
      console.log("Updated Group:", editedGroup);
      // Add logic to save changes to the backend or state
      setIsModalVisible(false);
    }
  };

  // Handle adding a new user
  const handleAddUser = () => {
    if (newUserName.trim() && editedGroup) {
      const newUser = {
        id: Date.now(), // Temporary unique ID
        name: newUserName.trim(),
      };
      const updatedUsers = [...editedGroup.users, newUser];
      setEditedGroup({
        ...editedGroup,
        users: updatedUsers,
        memberCount: updatedUsers.length, // Update member count
      });
      setNewUserName("");
    }
  };

  // Handle removing a user
  const handleRemoveUser = (userId: number) => {
    if (editedGroup) {
      const updatedUsers = editedGroup.users.filter((user) => user.id !== userId);
      setEditedGroup({
        ...editedGroup,
        users: updatedUsers,
        memberCount: updatedUsers.length, // Update member count
      });
    }
  };

  // Handle updating group details
  const handleGroupDetailChange = (field: keyof Group, value: string | number) => {
    if (editedGroup) {
      setEditedGroup({
        ...editedGroup,
        [field]: value,
      });
    }
  };

  // Handle creating a new group
  const handleCreateGroup = () => {
    console.log("New Group:", newGroup);
    // Add logic to save the new group to the backend or state
    setIsCreateModalVisible(false);
    setNewGroup({});
    setSelectedUsers([]);
  };

  // Handle user selection
  const handleUserSelection = (user: User) => {
    setSelectedUsers((prev) => {
      if (prev.some((u) => u.id === user.id)) {
        return prev.filter((u) => u.id !== user.id);
      } else {
        return [...prev, user];
      }
    });
  };

  // Handle file upload
  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const users = text.split("\n").map((line, index) => ({
        id: Date.now() + index,
        name: line.trim(),
      }));
      setSelectedUsers((prev) => [...prev, ...users]);
    };
    reader.readAsText(file);
    return false; // Prevent default upload behavior
  };

  // Columns for the table
  const columns: ColumnsType<Group> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search by name"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button type="primary" onClick={() => confirm()} icon={<SearchOutlined />} size="small">
            Search
          </Button>
        </div>
      ),
      onFilter: (value, record) => record.name.toLowerCase().includes(value.toString().toLowerCase()),
    },
    {
      title: "Member Count",
      dataIndex: "memberCount",
      key: "memberCount",
      sorter: (a, b) => a.memberCount - b.memberCount,
    },
    {
      title: "Recipient Count",
      dataIndex: "recipientCount",
      key: "recipientCount",
      sorter: (a, b) => a.recipientCount - b.recipientCount,
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "dateCreated",
      sorter: (a, b) => new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="default" icon={<EditOutlined />} onClick={() => handleOpenModal(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6 bg-neutral-100 dark:bg-neutral-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-neutral-800 dark:text-neutral-200">
        Message Groups
      </h1>

      {/* Create Group Button */}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsCreateModalVisible(true)}
        style={{ marginBottom: 16 }}
      >
        Create Group
      </Button>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={dummyGroups}
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
      />

      {/* Modal for Editing Group */}
      <Modal
        title="Edit Group"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCloseModal}
        width={800}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            Close
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        {editedGroup && (
          <div className="space-y-4">
            {/* Group Details */}
            <div className="flex space-x-4">
              <Input
                placeholder="Group Name"
                value={editedGroup.name}
                onChange={(e) => handleGroupDetailChange("name", e.target.value)}
              />
              <InputNumber
                placeholder="Member Count"
                value={editedGroup.memberCount}
                disabled
              />
              <InputNumber
                placeholder="Recipient Count"
                value={editedGroup.recipientCount}
                disabled
              />
            </div>

            {/* List of Users */}
            <List
                dataSource={editedGroup.users}
                renderItem={(user) => (
                    <List.Item
                    key={user.id} // Add key prop here
                    actions={[
                        <Popconfirm
                        key={user.id}
                        title="Are you sure you want to remove this user?"
                        onConfirm={() => handleRemoveUser(user.id)}
                        >
                        <Button type="text" danger icon={<DeleteOutlined />} />
                        </Popconfirm>,
                    ]}
                    >
                    {user.name}
                    </List.Item>
                )}
                className="max-h-64 overflow-y-auto"
            />

            {/* Add New User */}
            <div className="flex space-x-2">
              <Input
                placeholder="Add new user"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAddUser}>
                Add
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal for Creating Group */}
      <Modal
        title="Create Group"
        visible={isCreateModalVisible}
        onOk={handleCreateGroup}
        onCancel={() => setIsCreateModalVisible(false)}
        width={800}
        footer={[
          <Button key="close" onClick={() => setIsCreateModalVisible(false)}>
            Close
          </Button>,
          <Button key="create" type="primary" onClick={handleCreateGroup}>
            Create
          </Button>,
        ]}
      >
        <div className="space-y-4">
          {/* Group Name and Description */}
          <Input
            placeholder="Group Name"
            value={newGroup.name}
            onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
          />
          <Input
            placeholder="Description"
            value={newGroup.description}
            onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
          />

          {/* User Selection */}
          <div className="flex space-x-4">
            <List
              dataSource={dummyGroups.flatMap((group) => group.users)}
              renderItem={(user) => (
                <List.Item
                  key={user.id}
                  actions={[
                    <Button
                    key={user.id}
                      type={selectedUsers.some((u) => u.id === user.id) ? "primary" : "default"}
                      onClick={() => handleUserSelection(user)}
                    >
                      {selectedUsers.some((u) => u.id === user.id) ? "Selected" : "Select"}
                    </Button>,
                  ]}
                >
                  {user.name}
                </List.Item>
              )}
              className="max-h-64 overflow-y-auto"
            />

            {/* File Upload */}
            <Upload
              beforeUpload={handleFileUpload}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Upload Users from File</Button>
            </Upload>
          </div>

          {/* Selected Users */}
          <List
            dataSource={selectedUsers}
            renderItem={(user) => (
              <List.Item>
                {user.name}
              </List.Item>
            )}
            className="max-h-64 overflow-y-auto"
          />
        </div>
      </Modal>
    </div>
  );
}