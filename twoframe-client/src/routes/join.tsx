import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { ArrowLeft } from "lucide-react";
import { AddAttendeeForm } from "@/components/shared/join/AddAttendeeForm";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/join")({
  component: JoinTournamentPage,
});

function JoinTournamentPage() {
  const [joinedCode, setJoinedCode] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      <Toaster />
      <div className="w-[90%] max-w-[450px] space-y-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <Card>
          {!joinedCode ? (
            <>
              <CardHeader>
                <h1 className="text-4xl md:text-5xl font-black mb-3 text-center">
                  <span className="bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                    Join Tournament
                  </span>
                </h1>
                <CardDescription className="text-center">
                  Enter your name and the tournament's attendee code to join
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AddAttendeeForm onSuccess={(code) => setJoinedCode(code)} />
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader>
                <h1 className="text-4xl md:text-5xl font-black mb-3 text-center">
                  <span className="bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                    You're in! 🎉
                  </span>
                </h1>
                <CardDescription className="text-center">
                  You've successfully joined the tournament. Use the link below
                  to view the bracket.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md bg-muted px-4 py-3 text-sm font-mono break-all text-muted-foreground">
                  {window.location.origin}/tournament/{joinedCode}
                </div>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-lg hover:shadow-green-500/50 transition-all duration-300"
                >
                  <Link
                    to="/tournament/$attendeeCode"
                    params={{ attendeeCode: joinedCode }}
                  >
                    Go to Tournament
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => setJoinedCode(null)}
                >
                  Join another tournament
                </Button>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
