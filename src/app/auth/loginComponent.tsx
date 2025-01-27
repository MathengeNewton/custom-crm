"use client";
import React from "react";
import { Input, Checkbox, Button, Divider } from "antd";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation"; // For redirecting

export default function LoginPage() {
  const router = useRouter(); // Initialize the router

  // Handle login button click
  const handleLogin = () => {
    // Redirect to /dashboard/ without authentication
    router.push("/dashboard/");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Photo */}
      <div
        className="hidden lg:block w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/login.png')", // Replace with your photo path
        }}
      ></div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Login
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Doesn&apos;t have an account yet?{" "}
              <a
                href="/signup"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign Up
              </a>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="rounded-md shadow-sm -space-y-px">
              {/* Email Address */}
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email Address
                </label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                />
              </div>

              {/* Password */}
              <div className="mt-4">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <Input.Password
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Enter 6 characters or more"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <Checkbox name="remember" className="text-sm text-gray-900">
                Remember me
              </Checkbox>
            </div>

            {/* Login Button */}
            <div>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleLogin} // Redirect on click
              >
                LOGIN
              </Button>
            </div>

            {/* Divider */}
            <Divider plain className="text-gray-500">
              OR
            </Divider>

            {/* Social Login Buttons */}
            <div className="flex space-x-4">
              <Button
                icon={<GoogleOutlined />}
                className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Google
              </Button>
              <Button
                icon={<FacebookOutlined />}
                className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Facebook
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}