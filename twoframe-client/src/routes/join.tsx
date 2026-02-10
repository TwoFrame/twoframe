import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { JoinTournamentForm } from "@/components/join/addAttendeeForm"; 
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export const Route = createFileRoute("/join")({
  component: JoinTournamentPage,
});

function JoinTournamentPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      <Toaster />
      <Card className="w-[90%] max-w-[450px]">
        <CardHeader>
          <CardTitle>Join a Tournament</CardTitle>
          <CardDescription>
            Enter your name and the tournament's attendee code to join
          </CardDescription>
        </CardHeader>
        <CardContent>
          < JoinTournamentForm />
        </CardContent>
      </Card>
    </div>
  );
}
