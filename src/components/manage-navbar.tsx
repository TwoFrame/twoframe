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



export default function ManageNavigationBar() {
    const context = useContext(TournamentContext);

    return (
        <Navbar maxWidth="full" height="80px" className="border-b-1 border-b-background-light-grey">
            <NavbarBrand>
                <span className="flex gap-4">
                    <PublicChip is_public={context?.tournament?.public!}/>
                    <h1>{context?.tournament?.slug}</h1>
                </span>
            </NavbarBrand>

            <NavbarContent justify="center">
                <NavbarItem className="text-white">
                    
                </NavbarItem>
                <NavbarItem className="text-white">
                <User
                    avatarProps={{
                        src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                    }}
                    name=""
                />

                </NavbarItem>
            </NavbarContent>
            

        </Navbar>

    );
}
