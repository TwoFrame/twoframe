import { formatDateRange, formatTimestampWithDate } from "@/app/_lib/functions";
import { TournamentData } from "@/app/dashboard/tournaments/types";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Ellipsis, Eye, Trash, Calendar } from "lucide-react";
import Link from "next/link";

/**
 * Tournament card that is displayed in the Explore Page
 * @param tournament the tournament data
 */
export default function TournamentExploreCard({ tournament }: { tournament: TournamentData }) {

    return (
        <Card className="w-full mb-6" radius="md">
            <CardHeader className="flex justify-between">

                <h3 className="text-md font-semibold">{tournament.title}</h3>

                <Dropdown>
                    <DropdownTrigger>
                        <Button isIconOnly variant="light" size="sm">
                            <Ellipsis size={16} />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Tournament Card Actions">
                        <DropdownItem key="view" startContent={<Eye size={16} />} as={Link} href ={`/dashboard/tournaments/${tournament.slug}?context=Explore`} > 
                            View
                        </DropdownItem>
                        {/* <DropdownItem key="start" startContent={<Star size={16} />}>
                            Add to favorites
                        </DropdownItem> */}
                    </DropdownMenu>
                </Dropdown>
            </CardHeader>

            <CardBody className="py-0">
                <div className="flex flex-col">
                    <span className="flex gap-2 mt-2">
                        <Calendar size={16} className="text-color-light-grey" />
                        <p className="text-xs text-color-light-grey">{formatDateRange(tournament.start_date, tournament.end_date)}</p>
                    </span>
                </div>
            </CardBody>

            <Divider className="mt-4" />

            <CardFooter className="py-4">
                <p className="text-xs text-color-light-grey">Created {formatTimestampWithDate(tournament.created_at)}</p>
            </CardFooter>
        </Card>
    )
}
