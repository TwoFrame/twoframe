"use client";

import "../../styles/globals.css";

export default function DashboardLayout({children}: { children: React.ReactNode; }) {

  return (
    <html lang="en" data-theme="dark" className="bg-background-default w-full">
      <body>
          <main className="flex-1">
              {children}
          </main>
          
      </body>
    </html>

  );
}
