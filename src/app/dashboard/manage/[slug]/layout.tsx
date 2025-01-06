"use client";

import ManageNavigationBar from "@/components/manage-navbar";
import "../../../styles/globals.css";
import { useParams, useSearchParams } from "next/navigation";
import { TournamentContextType, TournamentData } from "../../tournaments/types";
import { createContext, useEffect, useState } from "react";
import { getTournamentBySlug } from "@/db/queries/select";
import { fetchTournamentBySlug } from "./actions";
import TournamentContext from "./context";


export default function DashboardLayout({ children }: { children: React.ReactNode; }) {

  const params = useParams<{ slug: string }>()
  const [tournament, setTournament] = useState<TournamentData | null>(null);
  
  const handleFetchBySlug = async () => {
    const result = await fetchTournamentBySlug(params.slug)
    if (result) {
      setTournament(result)
    }
  }

  useEffect(() => {
    handleFetchBySlug()
  }, [])

  return (
    <html lang="en" data-theme="dark" className="bg-background-default w-full">
      <body>
        <main className="flex-1">
          <TournamentContext.Provider value={{ tournament }}>
            <ManageNavigationBar />
            {children}
          </TournamentContext.Provider>
        </main>

      </body>
    </html>

  );
}
