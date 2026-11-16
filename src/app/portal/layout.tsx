"use client";

import React, { useState } from "react";
import { PortalSidebar } from "@/components/portal/PortalSidebar";
import { PortalHeader } from "@/components/portal/PortalHeader";
import { useLanguage } from "@/context/LanguageContext";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { direction } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F7F7F4] flex flex-col antialiased">
      {/* Sidebar */}
      <PortalSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Wrapper with Sidebar Offset */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden lg:pl-72 rtl:lg:pl-0 rtl:lg:pr-72 transition-all duration-300">
        {/* Top Header */}
        <PortalHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Main View Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
