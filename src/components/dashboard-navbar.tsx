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

import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";
import { fetchUserProfilePicture } from "./actions";


export default function DashboardNavBar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isNavigating, setIsNavigating] = useState(false);
    const [profilePicture, setProfilePicture] = useState<string | null>(null);

    const {
    state,
    setOpenMobile,
    } = useSidebar();

    const handleFetchUser = async() => {
      const supabase = await createClient();
      const { data: { user }} = await supabase.auth.getUser();
      
      if (!user) {
        return
      }
      const result = await fetchUserProfilePicture(user.id)
  
      setProfilePicture(result);
    }

    
    useEffect(()=> {
      handleFetchUser()
    },[])
    
    return (
    <Sidebar style={{ borderRight: "none", height: "100%"} }>
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
              <SidebarMenuButton isActive={pathname.startsWith("/dashboard/tournaments/explore")}>
              <SidebarLink href="/dashboard/tournaments/explore">
                <Search size={16}/>
                <span>Explore</span>
              </SidebarLink>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem key="create" className="my-1">
              <SidebarMenuButton isActive={pathname.startsWith("/dashboard/tournaments/create")} >
              <SidebarLink href="/dashboard/tournaments/create">
                <SquarePen size={16}/>
                <span>Create</span>
              </SidebarLink>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/** 
            <Collapsible className="my-1">
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
            */}
        
            <SidebarMenuItem key="manage" className="my-1">
              <SidebarMenuButton isActive={pathname == "/dashboard/tournaments/collections"} >
                <SidebarLink href="/dashboard/tournaments/collections">
                    <Bolt size={16}/>
                    <span>Collections</span>
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
            src: profilePicture ?? "http://127.0.0.1:54321/storage/v1/object/public/profile-pics/xT7DmZL.png",
          }}
          description={
            <Link href={profilePicture ?? 'http://127.0.0.1:54321/storage/v1/object/public/profile-pics/xT7DmZL.png'}>
              @testUserName
            </Link>
          }
          name="Test User"
        />
      </section>
     
    </SidebarFooter>
  </Sidebar>
    );
}