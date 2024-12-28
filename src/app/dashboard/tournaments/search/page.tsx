"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@nextui-org/button";
import { PanelLeft } from "lucide-react";

export default function SearchPage() {

  const {
    setOpenMobile,
  } = useSidebar();

  return (
    <section className="flex flex-col bg-background-default h-screen w-full">

      <section className="dashboard-nav flex items-center justify-between w-full" >
        <h1 className="text-lg font-semibold">
          Search for tournaments
        </h1>

        {/* Opens the mobile sidebar */}
        <Button onPress={()=>{
            setOpenMobile(true)
          }}
          isIconOnly
          variant="light"
          radius="sm"
          className="flex justify-center lg:hidden"
        >
          <PanelLeft size={16}/>
        </Button>
      </section>
      
      {/* Content under the dashboard navbar with content padding */}
      <section className="p-4">
        <div className="h-full w-full bg-background-light-grey p-4">testing layout</div>

      </section>

    </section>
    
  );
  {/*TODO: add actual search feature for this page, and display existing tournaments
               should probably add tournament creation first!*/}
}
