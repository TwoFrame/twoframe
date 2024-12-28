"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@nextui-org/button"
import { Tabs, Tab } from "@nextui-org/tabs"
import { PanelLeft, LayoutGrid, Rows3 } from "lucide-react"
import { useEffect, useState } from "react";
import { fetchManaged } from "./utils";
import { createClient } from "@/utils/supabase/client";
import { TournamentData } from "../types";
import TournamentPreviewCard from "@/components/tournament-preview-card";

export default function ManagePage(){
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
    const result = await fetchManaged(0, user.id)
    setManagedTournaments(result ?? [])
  }

  useEffect(()=> {
    handleFetchManaged()
  },[])

  return (
    <section className="flex flex-col bg-background-default h-screen w-full">

      <section className="dashboard-nav flex items-center justify-between w-full" >
        <div>
          <h1 className="text-lg font-semibold">Manage</h1>
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
      <section className="p-4 flex flex-col w-full lg:max-w-3xl">

          <span className="flex justify-between">
            <Tabs key="tournament_type" aria-label="Options" variant="light" color="primary" className="flex flex-col" selectedKey={selected} onSelectionChange={(key)=>setSelected(key.toString())}>
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
              <TournamentPreviewCard tournament={tournament} key={tournament.id} />
            ))}
            </section>
          )}

  
      </section>

    </section>

  )
}


