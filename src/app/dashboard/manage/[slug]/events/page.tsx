'use client'

import { useContext } from "react";
import TournamentContext from "@/app/dashboard/manage/[slug]/context";

export default function EventsPage() {
    const context = useContext(TournamentContext);
    return (
      <section className="p-4">
        <p>events</p>
        
        <a href={`/dashboard/manage/${context?.tournament?.slug}/events/create`}>CREAETE ANANN EVENT</a>
      </section>
    );
  

}