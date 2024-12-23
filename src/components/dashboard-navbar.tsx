"use client";

import { Sidebar, SidebarFooter, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem, SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Bolt, ChevronDown, Search, SquarePen, Star } from "lucide-react";
import appLogo from '../../public/app_logo.svg';
import { usePathname } from "next/navigation";
import { User } from "@nextui-org/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SidebarLink from "./sidebar-link";


export default function DashboardNavBar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isNavigating, setIsNavigating] = useState(false);

    const {
    state,
    setOpenMobile,
    } = useSidebar();


    return (
    <Sidebar style={{ borderRight: "none"} } >
    <SidebarHeader>
        <Link className="inline-flex w-fit items-center gap-4 font-micro text-3xl text-white p-2" href="/" onClick={()=>setOpenMobile(false)}>
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
              <SidebarLink href="/dashboard/tournaments/search">
                <Search size={16}/>
                <span>Explore</span>
              </SidebarLink>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem key="create" className="my-1">
              <SidebarMenuButton isActive={pathname == "/dashboard/tournaments/create"} >
              <SidebarLink href="/dashboard/tournaments/create">
                <SquarePen size={16}/>
                <span>Create</span>
              </SidebarLink>
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
                <SidebarLink href="/dashboard/tournaments/manage">
                    <Bolt size={16}/>
                    <span>Manage</span>
                </SidebarLink>

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
    );
}