import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function ChangeTournamentStateForm({
  id,
  code,
  currentState,
  canStart,
}: {
  id: string;
  code: string;
  currentState: "open" | "playing" | "completed";
  canStart: Boolean;
}) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (state: "playing" | "completed") => {
      const response = await fetch(
        `${import.meta.env.VITE_TWOFRAME_SERVER_URL}/tournament/${id}/state`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tournament_id: id, state }),
        },
      );
      return await response.json();
    },
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["tournament", "admin", code],
      });
    },
  });

  if (currentState === "completed") return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {currentState === "open" ? (
          <Button
            disabled={!canStart}
            className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-lg hover:shadow-green-500/50 transition-all duration-300 disabled:opacity-50"
          >
            Start Tournament
          </Button>
        ) : (
          <Button className="bg-red-500 hover:bg-red-600 text-white" size="sm">
            End Tournament
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-white border-green-200">
        <DialogHeader>
          <DialogTitle className="text-gray-800">
            {currentState === "open" ? "Start Tournament?" : "End Tournament?"}
          </DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-4 pt-2">
              {currentState === "open" && (
                <>
                  <p className="text-red-500 text-sm">
                    This will lock in all attendees and start the live bracket.
                    This action cannot be undone.
                  </p>
                  <Button
                    onClick={() => mutation.mutate("playing")}
                    className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white w-full"
                  >
                    {mutation.isPending ? <Spinner /> : "Confirm Start"}
                  </Button>
                </>
              )}
              {currentState === "playing" && (
                <>
                  <p className="text-red-500 text-sm">
                    This will lock the bracket and mark the tournament as
                    completed. This action cannot be undone.
                  </p>
                  <Button
                    onClick={() => mutation.mutate("completed")}
                    className="bg-red-500 hover:bg-red-600 text-white w-full"
                  >
                    {mutation.isPending ? <Spinner /> : "Confirm End"}
                  </Button>
                </>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
