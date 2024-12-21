"use client";

import { Sidebar, SidebarFooter, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem, SidebarProvider, SidebarSeparator, SidebarTrigger } from "@/components/ui/sidebar";
import { User } from "@nextui-org/user";
import "../styles/globals.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";


export default function DashboardLayout({children}: { children: React.ReactNode; }) {
  const pathname = usePathname();

  return (
    <html lang="en" data-theme="dark" className="bg-background-default">
      <body>
        <SidebarProvider>
          <Sidebar style={{ borderRight: "none" }} >
            <SidebarHeader>
              {/* <Image src=""/> */}
              <Link className="font-micro text-2xl text-white my-4 px-2" href="/">twoframe</Link>
            </SidebarHeader>

            <SidebarContent className="my-2">

            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>

                    <SidebarMenuItem key="search" className="my-1">
                      <SidebarMenuButton isActive={pathname == "/dashboard/tournaments/search"}>
                        <Link href="/dashboard/tournaments/search">Search</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem key="create" className="my-1">
                      <SidebarMenuButton isActive={pathname == "/dashboard/tournaments/create"} >
                        <Link href="/dashboard/tournaments/create">Create</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <Collapsible defaultOpen className="my-1">
                      <SidebarMenuItem key="favorites">                        
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton  className="flex items-center justify-between">
                                Favorites

                                <ChevronDown
                                  size={18}
                                  className="transition-transform duration-200"
                                />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                      </SidebarMenuItem>
        
                      <CollapsibleContent>
                          <SidebarMenuSub>
                            <SidebarMenuSubItem>Minecraft</SidebarMenuSubItem>
                          </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="flex justify-start w-full">
              <User
                className="w-full mr-100"
                avatarProps={{
                  src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                }}
                description={
                  <Link href="https://x.com/jrgarciadev">
                    @williammm
                  </Link>
                }
                name="William"
              />
            </SidebarFooter>
          </Sidebar>

          {/* <SidebarTrigger/> */}
          <main>
            {children}
          </main>
        </SidebarProvider>

      </body>
    </html>

  );
}
