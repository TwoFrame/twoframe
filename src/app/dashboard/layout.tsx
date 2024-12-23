"use client";

import "../styles/globals.css";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardNavBar from "@/components/dashboard-navbar";


export default function DashboardLayout({children}: { children: React.ReactNode; }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <html lang="en" data-theme="dark" className="bg-background-default w-full">
      <body>
        <SidebarProvider className="flex flex-row">
          <DashboardNavBar />
          {/* <SidebarTrigger/> */}
          <main className="flex-1">
              {children}
          </main>
          
        </SidebarProvider>

      </body>
    </html>

  );
}
