"use client";

import { getTournamentBySlug } from "@/db/queries/select";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import { useEffect, useState } from "react";
import { TournamentData } from "../types";
import { fetchTournamentBySlug } from "./actions";
import { useSearchParams, useParams } from "next/navigation";
import { Skeleton } from "@nextui-org/skeleton";
import { Spinner } from "@nextui-org/spinner";
import { Button } from "@nextui-org/button";
import { formatDateRange } from "@/app/_lib/functions";
import{ useRouter } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeft } from "lucide-react";


export default function TournamentPage() {

    // There are various ways a user can access a tournament page like from the explore 
    // or collections. To help with keeping track of their navigation history, we store
    // their previous page in the URL parameters
    const router = useRouter();

    const searchParams = useSearchParams();
    const context = searchParams.get("context")

    const params = useParams<{ slug: string}>()

    const [tournament, setTournament] = useState<TournamentData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const {
        setOpenMobile,
      } = useSidebar();
    
    const handleViewAllEvents = () => {
        router.push(`/dashboard/tournaments/${params.slug}/events?context=${context}`);
    };

    const handleFetchBySlug = async () => {
        setIsLoading(true);

        const result = await fetchTournamentBySlug(params.slug)
        if (result) {
            setTournament(result)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        handleFetchBySlug()
    }, [])


    return (
        <section className="flex flex-col bg-background-default h-screen w-full">

            {/* Custom dashboard nav title bar that displays basic info */}
            <section className="dashboard-nav flex items-center justify-between">
                <Breadcrumbs color="primary">
                    <BreadcrumbItem href={`/dashboard/tournaments/${context?.toLowerCase()}`}><h1 className="text-lg font-semibold text-white">{context}</h1></BreadcrumbItem>
                    <BreadcrumbItem><h1 className="text-lg font-semibold">{params.slug}</h1></BreadcrumbItem>
                </Breadcrumbs>

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

            <section className="p-4 flex flex-col w-full lg:max-w-3xl">
                {isLoading ?
                    <Spinner color="default" className="mt-24"/>
                    :
                    <>
                        {tournament == null ?
                            <p>No tournament data available</p>
                            :
                            <>
                                <p>{tournament.title}</p>
                                <p>{formatDateRange(tournament.start_date, tournament.end_date)}</p>
                                <Button onPress={handleViewAllEvents} size="md" radius="sm" className="w-fit">
                                    View all events
                                </Button>
                            </>
                        }
                    </>

                }


            </section>

        </section>
    )
}