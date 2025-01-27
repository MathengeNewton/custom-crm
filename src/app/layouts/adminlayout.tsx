// layouts/DashboardLayout.tsx
import React from "react";
import { GlobalSidebar } from "@/components/AdminSidebar"; // Import your sidebar component

import { ThemeProvider } from "next-themes";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">

      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {/* Sidebar - Fixed and unscrollable */}
        <div className="fixed h-screen w-1/5 flex-shrink-0">
          <GlobalSidebar />
        </div>

        {/* Main Content - Scrollable */}
        <main className="flex-1 ml-[20%] p-4 bg-neutral-100 dark:bg-neutral-900 overflow-y-auto">
          {children}
        </main>
      </ThemeProvider>
    </div>
  );
}