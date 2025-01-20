"use client";

import { useContext } from "react";
import TournamentContext from "@/app/dashboard/manage/[slug]/context";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function EventsPage() {
  const context = useContext(TournamentContext);
  return (
    <section className="p-4">
      <Button
        className="relative left-1/2 -translate-x-1/2"
        as={Link}
        isDisabled={!context?.tournament?.slug}
        color="primary"
        href={`/dashboard/manage/${context?.tournament?.slug}/events`}
      >
        Manage Events
      </Button>
    </section>
  );
}
