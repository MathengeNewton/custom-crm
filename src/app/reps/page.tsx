"use client";
import React, { useState } from "react";
import { Form, Input, Button, Select, DatePicker, message } from "antd";
import dayjs from "dayjs";

interface RegisterFormValues {
  name: string;
  dateApplied: dayjs.Dayjs;
  location: string;
  salesRep: string;
  priceGroup: string;
}

export default function RegisterUserPage() {
  const [form] = Form.useForm<RegisterFormValues>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("User registered successfully!");
      form.resetFields();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">Register User</h2>
        <Form form={form} layout="vertical" onFinish={handleRegister}>
          <Form.Item
            label="Business Name"
            name="name"
            rules={[{ required: true, message: "Please enter business name" }]}
          >
            <Input placeholder="Enter business name" />
          </Form.Item>

          <Form.Item
            label="Date Applied"
            name="dateApplied"
            rules={[{ required: true, message: "Please select date" }]}
          >
            <DatePicker 
              className="w-full" 
              format="YYYY-MM-DD" 
              disabledDate={(current) => current && current > dayjs()} 
            />
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Please enter location" }]}
          >
            <Input placeholder="Enter location" />
          </Form.Item>

          {/* <Form.Item
            label="Sales Representative"
            name="salesRep"
            rules={[{ required: true, message: "Please select a sales rep" }]}
          >
            <Select placeholder="Select sales rep">
              <Select.Option value="Rep 1">Rep 1</Select.Option>
              <Select.Option value="Rep 2">Rep 2</Select.Option>
              <Select.Option value="Rep 3">Rep 3</Select.Option>
              <Select.Option value="Rep 4">Rep 4</Select.Option>
              <Select.Option value="Rep 5">Rep 5</Select.Option>
            </Select>
          </Form.Item> */}

          <Form.Item
            label="Price Group"
            name="priceGroup"
            rules={[{ required: true, message: "Please select a price group" }]}
          >
            <Select placeholder="Select price group">
              <Select.Option value="Group 1">Group 1</Select.Option>
              <Select.Option value="Group 2">Group 2</Select.Option>
              <Select.Option value="Group 3">Group 3</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Register User
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
