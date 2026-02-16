import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { AddAttendeeForm } from "@/components/shared/join/AddAttendeeForm";
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
  const navigate = useNavigate();

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
          <AddAttendeeForm
            onSuccess={(attendeeCode: string) => {
              navigate({
                to: "/tournament/$attendeeCode",
                params: { attendeeCode },
              });
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
