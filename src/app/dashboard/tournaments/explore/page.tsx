"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@nextui-org/button";
import { PanelLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { TournamentData } from "../types";
import { createClient } from "@/utils/supabase/client";
import { fetchAllTournaments } from "./actions";
import TournamentExploreCard from "@/components/tournament-explore-card";
import { Spinner } from "@nextui-org/spinner";

export default function ExplorePage() {
  const [allTournaments, setAllTournaments] = useState<TournamentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleFetchAll = async () => {
    setIsLoading(true);
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }
    const result = await fetchAllTournaments();
    console.log(result);
    setAllTournaments(result ?? []);

    setIsLoading(false);
  };

  useEffect(() => {
    handleFetchAll();
  }, []);

  const { setOpenMobile } = useSidebar();

  return (
    <section className="flex flex-col bg-background-default h-screen w-full">
      <section className="dashboard-nav bg-background-default fixed z-50 flex items-center justify-between w-full">
        <h1 className="text-lg font-semibold">Explore</h1>

        {/* Opens the mobile sidebar */}
        <Button
          onPress={() => {
            setOpenMobile(true);
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
        {isLoading ? (
          <Spinner color="default" className="mt-24" />
        ) : (
          <section>
            {allTournaments?.map((tournament) => (
              <TournamentExploreCard
                tournament={tournament}
                key={tournament.id}
              />
            ))}
          </section>
        )}
      </section>
    </section>
  );
  {
    /*TODO: add actual search feature for this page, and display existing tournaments
               should probably add tournament creation first!*/
  }
}
