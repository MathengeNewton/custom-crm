// components/EditDeleteModal.tsx
import React, { useState } from "react";
import { Modal, Button, Form, Input, message } from "antd";

interface EditDeleteModalProps {
  record: { key: number; [key: string]: unknown }; // The record to edit/delete
  visible: boolean; // Whether the modal is visible
  onClose: () => void; // Function to close the modal
  onUpdate: (updatedRecord: unknown) => void; // Function to handle updates
  onDelete: (recordId: number) => void; // Function to handle deletions
}

const EditDeleteModal: React.FC<EditDeleteModalProps> = ({
  record,
  visible,
  onClose,
  onUpdate,
  onDelete,
}) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form values when the modal opens
  React.useEffect(() => {
    if (record) {
      form.setFieldsValue(record);
    }
  }, [record, form]);

  // Handle form submission (update)
  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const values = await form.validateFields();
      onUpdate({ ...record, ...values }); // Pass updated record to parent
      message.success("Record updated successfully!");
      onClose();
    } catch (error) {
      console.error("Failed to update record:", error);
      message.error("Failed to update record.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      onDelete(record.key); // Pass record ID to parent
      message.success("Record deleted successfully!");
      onClose();
    } catch (error) {
      console.error("Failed to delete record:", error);
      message.error("Failed to delete record.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Edit/Delete Record"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="delete" danger onClick={handleDelete} loading={isLoading}>
          Delete
        </Button>,
        <Button key="update" type="primary" onClick={handleUpdate} loading={isLoading}>
          Update
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter a name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="dateJoined"
          label="Date Joined"
          rules={[{ required: true, message: "Please enter a date" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="salesRep"
          label="Sales Rep"
          rules={[{ required: true, message: "Please enter a sales rep" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="priceGroup"
          label="Price Group"
          rules={[{ required: true, message: "Please enter a price group" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="totalOrders"
          label="Total Orders"
          rules={[{ required: true, message: "Please enter total orders" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="totalOrderPrice"
          label="Total Order Price"
          rules={[{ required: true, message: "Please enter total order price" }]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditDeleteModal;