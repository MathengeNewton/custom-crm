"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/globalSidebarComponents";
import {
  IconArrowLeft,
  IconMessageCircleUser,
  IconMessageUser,
  IconUsersGroup,
  IconMessages,
  IconUserCog,
  IconUserCheck,
  IconShoppingBag,
  IconShieldLock,
  IconReportAnalytics,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export function GlobalSidebar() {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconReportAnalytics className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Clients",
      href: "#",
      icon: (
        <IconUsersGroup className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      subItems: [
        {
          label: "Registration Request",
          href: "/dashboard/clients/registration-request",
          icon: <IconUserCog className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
        },
        {
          label: "All Clients",
          href: "/dashboard/clients",
          icon: <IconUserCheck className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
        }
      ]
    },
    {
      label: "Sales Reps",
      href: "/dashboard/reps",
      icon: (
        <IconShieldLock className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Orders",
      href: "/dashboard/orders",
      icon: (
        <IconShoppingBag className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Messages",
      href: "#",
      icon: (
        <IconMessageCircleUser className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      subItems: [
        {
          label: "Message Groups",
          href: "/dashboard/messages/groups",
          icon: <IconMessageUser className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
        },
        {
          label: "Campaigns",
          href: "/dashboard/messages/campaigns",
          icon: <IconMessages className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
        }
      ]
    },
    {
      label: "Logout",
      href: "/auth/login",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme(); // Hook to manage theme

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen" // Use full height
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <>
              <Logo />
            </>
            <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
                <React.Fragment key={idx}>
                  <SidebarLink link={link} />                 
                </React.Fragment>
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Velmat Admin",
                href: "/dashboard",
                icon: (
                  <Image
                    src="/images/profile.jpg"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
            {/* Light/Dark Mode Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center justify-center w-full p-2 mt-4 text-neutral-700 dark:text-neutral-200 hover:bg-gray-200 dark:hover:bg-neutral-700 rounded-md transition-colors"
            >
              {theme === "dark" ? (
                <IconSun className="h-5 w-5" />
              ) : (
                <IconMoon className="h-5 w-5" />
              )}
              <span className="ml-2">
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </span>
            </button>
          </div>
        </SidebarBody>
      </Sidebar>
      {/* Main content will be injected here */}
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="/dashboard/"
      className="font-normal flex space-x-2 items-center text-sm text-black dark:text-white py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Velmart
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="/dashboard/"
      className="font-normal flex space-x-2 items-center text-sm text-black dark:text-white py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};