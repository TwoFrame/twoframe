import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { AddAttendeeForm } from "@/components/shared/join/AddAttendeeForm";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/join")({
  component: JoinTournamentPage,
});

function JoinTournamentPage() {
  const navigate = useNavigate();

  return (
    <div className="size-full min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 flex items-center justify-center p-8">
      <Toaster />
      <div className="max-w-md w-full space-y-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="bg-white border border-green-200 rounded-xl p-8 shadow-2xl">
          <h1 className="text-4xl md:text-5xl font-black mb-3 text-center">
            <span className="bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Join Tournament
            </span>
          </h1>
          <p className="text-gray-600 mb-8 text-center text-sm">
            Enter your name and the tournament's attendee code to join
          </p>

          <AddAttendeeForm
            onSuccess={(attendeeCode: string) => {
              navigate({
                to: "/tournament/$attendeeCode",
                params: { attendeeCode },
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}