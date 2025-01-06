"use client";

import "../../styles/globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardNavBar from "@/components/dashboard-navbar";


export default function DashboardLayout({children}: { children: React.ReactNode; }) {

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
