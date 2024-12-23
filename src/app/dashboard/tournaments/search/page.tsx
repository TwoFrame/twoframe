"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@nextui-org/button";
import { PanelLeft } from "lucide-react";

export default function SearchPage() {

  const {
    setOpenMobile,
  } = useSidebar();

  return (
      <section className="flex flex-col bg-background-default lg:w-3/4 h-screen">

        {/* Custom dashboard nav title bar that displays basic info */}
        <div className="dashboard-nav flex items-center justify-between w-3/4" >
          <h1 className="text-xl font-semibold">
            Search for tournaments
          </h1>
          <Button onPress={()=>{
            setOpenMobile(true)
          }}
          isIconOnly
          variant="light"
        >
          <PanelLeft size={16}/>
        </Button>
        </div>
      </section>
    
    
  );
  {/*TODO: add actual search feature for this page, and display existing tournaments
               should probably add tournament creation first!*/}
}
