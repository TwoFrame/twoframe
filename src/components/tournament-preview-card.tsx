import { TournamentData } from "@/app/dashboard/tournaments/types";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import Link from "next/link";

export default function TournamentPreviewCard({tournament}: {tournament: TournamentData}) {
    return (
        <Card className="w-full mb-4" radius="md">
            <CardHeader>
                <PublicChip is_public={tournament.public!}/>
            </CardHeader>
            <CardBody>
            <div className="flex flex-col">
                <Link href={`/dashboard/tournaments/${tournament.slug}`} className="hover:text-blue-primary">
                    <h3 className="text-md">{tournament.title}</h3>
                </Link>

                <p className="text-small text-default-500">{tournament.start_date}</p>
                </div>
            </CardBody>
        </Card>
    );
}

function PublicChip({is_public} : {is_public: boolean}) {
    return (
    <p className="text-xs">{is_public ? "public" : "private"}</p>
    )
}