"use client";

import { Sidebar, SidebarFooter, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem, SidebarProvider } from "@/components/ui/sidebar";
import { User } from "@nextui-org/user";
import "../styles/globals.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Bolt, ChevronDown, Search, SquarePen, Star } from "lucide-react";
import appLogo from '../../../public/app_logo.svg';


export default function DashboardLayout({children}: { children: React.ReactNode; }) {
  const pathname = usePathname();

  return (
    <html lang="en" data-theme="dark" className="bg-background-default w-full overflow-hidden">
      <body>
        <SidebarProvider>
          <Sidebar style={{ borderRight: "none"} } >
            <SidebarHeader>
                <Link className="inline-flex items-center gap-4 font-micro text-3xl text-white p-2" href="/">
                  <Image alt="app logo" src={appLogo} width={32} height={32}/>
                  twoframe
                </Link>
        
            </SidebarHeader>

            <SidebarContent className="my-2">

            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>

                    <SidebarMenuItem key="search" className="my-1">
                      <SidebarMenuButton isActive={pathname == "/dashboard/tournaments/search"}>
                        <Link href="/dashboard/tournaments/search"className="inline-flex items-center gap-2">
                        <Search size={16}/>
                          Explore
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem key="create" className="my-1">
                      <SidebarMenuButton isActive={pathname == "/dashboard/tournaments/create"} >
                        <Link href="/dashboard/tournaments/create" className="inline-flex items-center gap-2">
                          <SquarePen size={16}/>
                          <span>Create</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <Collapsible defaultOpen className="my-1">
                      <SidebarMenuItem key="favorites">                        
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton  className="inline-flex items-center justify-between">
                              <span className="inline-flex items-center gap-2">
                                <Star size={16}/>
                                Favorites
                              </span>
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
                
                    <SidebarMenuItem key="manage" className="my-1">
                      <SidebarMenuButton isActive={pathname == "/dashboard/tournaments/manage"} >
                        <Link href="/dashboard/tournaments/manage" className="inline-flex items-center gap-2">
                          <Bolt size={16}/>
                          <span>Manage</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
              <section className="px-2">
                 <User
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
              </section>
             
            </SidebarFooter>
          </Sidebar>

          {/* <SidebarTrigger/> */}
          <main className="flex-1">
              {children}
          </main>
          
        </SidebarProvider>

      </body>
    </html>

  );
}
