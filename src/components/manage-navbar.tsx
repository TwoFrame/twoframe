"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import PublicChip from "./public-chip";
import TournamentContext from "@/app/dashboard/manage/[slug]/context";
import { User } from "@nextui-org/user";
import { Skeleton } from "@nextui-org/skeleton";
import { Tabs, Tab } from "@nextui-org/tabs";
import { usePathname } from "next/navigation";



export default function ManageNavigationBar() {
    const context = useContext(TournamentContext);
    const pathname = usePathname();

    return (
        <Navbar maxWidth="full" height="80px" className="bg-background-default justify-between border-b-1 border-b-background-light-grey">
            <NavbarBrand>
                <span className="flex gap-4 items-center">

                    {context?.tournament != null ?
                    <>
                        <PublicChip is_public={context?.tournament?.public!}/>
                        <h1>{context?.tournament?.slug}</h1>
                    </>
                    :
                    <div className="flex gap-4 items-center">
                        <Skeleton className="flex rounded-md w-12 h-4" />
                        <Skeleton className="flex rounded-md w-12 h-4" />
                    </div>
                    }
                </span>
            </NavbarBrand>

            <NavbarContent justify="center">
                <Tabs key="tournament_type" aria-label="Options" variant="light" color="primary" className="flex flex-col mx-0" classNames={{cursor: "bg-background-dark-grey"}} selectedKey={pathname}>
                    <Tab  as={Link} key={`/dashboard/manage/${context?.tournament?.slug}/brackets`} title="Brackets" className="w-fit" href={`/dashboard/manage/${context?.tournament?.slug}/brackets`}/>
                    <Tab  as={Link} key={`/dashboard/manage/${context?.tournament?.slug}/details`} title="Details" className="w-fit" href={`/dashboard/manage/${context?.tournament?.slug}/details`}/>
                </Tabs>                
            </NavbarContent>
            

            <NavbarContent justify="end">
                <User
                    avatarProps={{
                        src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                    }}
                    name=""
                />
            </NavbarContent>

        </Navbar>

    );
}
