import ChangeTournamentStateForm from "@/components/TournamentStateUpdate";
import { Badge } from "@/components/ui/badge";

type Tournament = {
  tournament_id: string;
  name: string;
  date: string;
  state: "open" | "playing" | "completed";
  admin_code: string;
  attendee_code: string;
};

type TournamentHeaderProps = {
  tournament: Tournament;
};

export function TournamentHeader({ tournament}: TournamentHeaderProps){
    return (
        <div>
            <h1 className="text-3xl font-bold">{tournament.name}</h1>
            <p className="text-muted-foreground">{tournament.date}</p>
            <div className="flex items-center gap-2">
                <p>Status:</p>
                <Badge
                className="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                variant={tournament.state == "open" ? "default" : "secondary"}
                >
                {tournament.state}
                </Badge>
            </div>
            <ChangeTournamentStateForm
                id={tournament.tournament_id}
                code={tournament.admin_code}
                currentState={tournament.state}
            />
        </div>
    );
}
