"use client";

import { useContext, useEffect, useState } from "react";
import TournamentContext from "@/app/dashboard/manage/[slug]/context";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Ellipsis, Eye } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { fetchAllEventsUnderTournament } from "./actions";
import { EventData } from "./types";
import { Spinner } from "@nextui-org/spinner";
import EventManageCard from "@/components/event-manage-card";

export default function EventsPage() {
  const context = useContext(TournamentContext);
  const [allEvents, setAllEvents] = useState<EventData[]>([]);
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
      const result = await fetchAllEventsUnderTournament(context!.tournament!.id);
      setAllEvents(result ?? []);
  
      setIsLoading(false);
    };
  
    useEffect(() => {
      if (context!.tournament !== null) {
        handleFetchAll();

      }
    }, [context]);
  
  return (
    <section className="p-4">
      <div className="flex justify-between relative p-4 left-1/2 -translate-x-1/2 w-3/4 mb-8 border-b border-b-color-light-grey">
        <h1 className="text-4xl m-0">Events</h1>

              
      <Button
        as={Link}
        color="default"
        isDisabled={!context?.tournament?.slug}
        href={`/dashboard/manage/${context?.tournament?.slug}/events/add`}
      >
        Add New Event
      </Button>

      </div>
      <div className="relative p-0 left-1/2 -translate-x-1/2 w-full sm:w-3/4 ">
      {isLoading ? (
        <Spinner className="relative left-1/2 -translate-x-1/2"color="default" />
      ): (
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="w-[35%]">Title</th>
              <th className="w-[30%]">Attendees</th>
              <th className="w-[25%]">Created Date</th>
              <th className="w-[10%] text-center">Actions</th>
            </tr>
          </thead>



          <tbody>
            {allEvents?.map((event) => (
              <EventManageCard event={event}key={event.id}/>
            ))}
          </tbody>
        
        </table>



      )}
          </div>



      
    </section>
  );
}
