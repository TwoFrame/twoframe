"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@nextui-org/button"
import { Tabs, Tab } from "@nextui-org/tabs"
import { PanelLeft, LayoutGrid, Rows3 } from "lucide-react"
import { useEffect, useState } from "react";
import { fetchManagedTournaments } from "./actions";
import { createClient } from "@/utils/supabase/client";
import { TournamentData } from "../types";
import TournamentManageCard from "@/components/tournament-manage-card";

export default function CollectionsPage(){
  const { setOpenMobile } = useSidebar();

  const [selected, setSelected] = useState("participating");
  const [displayGrid, setDisplayGrid] = useState(true);
  const [managedTournaments, setManagedTournaments] = useState<TournamentData[]>([]);

  const handleLayoutToggle = () => {
    setDisplayGrid(!displayGrid)
  }

  const handleFetchManaged = async() => {
    const supabase = await createClient();
    const { data: { user }} = await supabase.auth.getUser();
    
    if (!user) {
      return
    }
    const result = await fetchManagedTournaments(0, user.id)
    console.log(result)
    setManagedTournaments(result ?? [])
  }

  useEffect(()=> {
    handleFetchManaged()
  },[])

  return (
    <section className="flex flex-col bg-background-default h-screen w-full">

      <section className="dashboard-nav bg-background-default fixed z-50 flex items-center justify-between w-full" >
        <div>
          <h1 className="text-lg font-semibold">Collections</h1>
          <p className="text-xs text-color-light-grey">Track your tournaments</p>
        </div>


        {/* Opens the mobile sidebar */}
        <Button onPress={() => {
          setOpenMobile(true)
        }}
          isIconOnly
          variant="light"
          radius="sm"
          className="flex justify-center lg:hidden"
        >
          <PanelLeft size={16} />
        </Button>
      </section>

      {/* Content under the dashboard navbar with content padding */}
      <section className="p-4 flex flex-col w-full lg:max-w-3xl mt-[80px]">

          <span className="flex justify-between">
            <Tabs key="tournament_type" aria-label="Options" variant="light" color="default" className="flex flex-col mx-0" classNames={{cursor: "bg-background-dark-grey"}} selectedKey={selected} onSelectionChange={(key)=>setSelected(key.toString())}>
              <Tab key="participating" title="Participating" className="w-fit"/>
              <Tab key="managed" title="Managed" className="w-fit"/>
            </Tabs>

            <Button isIconOnly className="bg-background-light-grey" radius="sm" onPress={handleLayoutToggle}>
              {displayGrid ? <LayoutGrid size={16} /> : <Rows3 size={16}/>}
            </Button>
          </span>
          
          {selected == "participating" && (
            <section className="w-full mt-4" >
              Participating!
            </section>
          )}

          {selected == "managed" && (
            <section className="w-full mt-4">
            {managedTournaments?.map((tournament) => (
              <TournamentManageCard tournament={tournament} key={tournament.id} />
            ))}
            </section>
          )}

  
      </section>

    </section>

  )
}


