"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import { Button } from "@nextui-org/button";
import { PanelLeft } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function TournamentEvents() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const context = searchParams.get("context");

  const params = useParams<{ slug: string }>();

  const { setOpenMobile } = useSidebar();

  return (
    <section className="flex flex-col bg-background-default h-screen w-full">
      {/* Custom dashboard nav title bar that displays basic info */}
      <section className="dashboard-nav flex items-center justify-between">
        <Breadcrumbs color="primary">
          <BreadcrumbItem
            href={`/dashboard/tournaments/${context?.toLowerCase()}`}
          >
            <h1 className="text-lg font-semibold text-white">{context}</h1>
          </BreadcrumbItem>
          <BreadcrumbItem
            href={`/dashboard/tournaments/${params.slug}?context=${context}`}
          >
            <h1 className="text-lg font-semibold text-white">{params.slug}</h1>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <h1 className="text-lg font-semibold">Events</h1>
          </BreadcrumbItem>
        </Breadcrumbs>
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
    </section>
  );
}
