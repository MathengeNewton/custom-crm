"use client";
import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter

const { Title } = Typography;

export default function LoginPage() {
  const router = useRouter(); // Initialize the router

  const onFinish = (values: unknown) => {
    console.log("Received values:", values);

    // Simulate a login API call or validation
    // For demonstration, assume login is successful
    const loginSuccess = true; // Replace with actual login logic

    if (loginSuccess) {
      message.success("Login successful!"); // Show success message
      router.push("/mobile/home"); // Redirect to /mobile/home
    } else {
      message.error("Invalid username or password"); // Show error message
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: "#f0f2f5",
      }}
    >
      {/* Logo at the top */}
      <div style={{ marginBottom: "24px" }}>
        <Image
          src="/logo.png" // Replace with your logo path
          alt="Logo"
          width={100}
          height={100}
          style={{ borderRadius: "50%" }} // Optional: Add styling to the logo
        />
      </div>

      {/* Login Form */}
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "24px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: "24px" }}>
          Login
        </Title>

        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          {/* Username Field */}
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              size="large"
            />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              style={{ marginTop: "16px" }}
            >
              Log In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}