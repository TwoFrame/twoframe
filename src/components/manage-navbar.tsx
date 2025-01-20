"use client";

import { useContext} from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
} from "@nextui-org/navbar";
import TournamentContext from "@/app/dashboard/manage/[slug]/context";
import { User } from "@nextui-org/user";
import { usePathname } from "next/navigation";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import Link from "next/link";
import Image from "next/image";
import appLogo from "../../public/app_logo.svg";

export default function ManageNavigationBar() {
  const context = useContext(TournamentContext);
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  return (
    <Navbar
      maxWidth="full"
      height="100px"
      className="bg-background-default justify-between border-b-1 border-b-background-light-grey"
    >
      <NavbarBrand>
        <Link className="mr-6"href={"/dashboard/tournaments/collections"}>
          <Image alt="app logo" src={appLogo} width={32} height={32} />
        </Link>
        <Breadcrumbs color="primary">
          {pathNames.map((segment, index) => {
            if (index == 0) {
              return ;
            }
            // Build href dynamically, ignoring the first breadcrumb href
            const href =
              index === 0
                ? "/dashboard/tournaments/collections"
                : `/${pathNames.slice(0, index + 1).join("/")}`;

            if (index == 1) {
              return (
                <BreadcrumbItem key={index}>
                  <h1 className="font-semibold text-[12px] sm:text-lg">
                    {segment}
                  </h1>
                </BreadcrumbItem>
              );
            }
            return (
              <BreadcrumbItem key={index} href={href}>
                <h1 className="font-semibold text-[12px] sm:text-lg">
                  {segment}
                </h1>
              </BreadcrumbItem>
            );
          })}
        </Breadcrumbs>
      </NavbarBrand>

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
