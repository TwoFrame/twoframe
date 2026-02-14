import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "../../../components/ui/spinner";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function ChangeTournamentStateForm({
  id,
  code,
  currentState,
}: {
  id: string;
  code: string;
  currentState: "open" | "playing" | "completed";
}) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (state: "playing" | "completed") => {
      const response = await fetch(
        `${import.meta.env.VITE_TWOFRAME_SERVER_URL}/tournament/${id}/state`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tournament_id: id, state }),
        },
      );

      return await response.json();
    },
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["tournament", code],
      });
    },
    //TODO: handle failed tournament status update
    //onError: () => {
    //}
  });
  if (currentState === "completed") {
    return (
      <></>
    );
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          {currentState === "open" ? "Start Tournament" : "End Tournament"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Tournament Status</DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-3">
              {currentState === "open" && (
                <>
                  <Button onClick={() => mutation.mutate("playing")}>
                    {mutation.isPending ? <Spinner /> : "Start Tournament"}
                  </Button>
                  <div className="text-red-500 text-sm">
                    This will lock in all attendees and allow you to edit a live
                    bracket. You cannot undo this action.
                  </div>
                </>
              )}
              {currentState === "playing" && (
                <>
                  <Button onClick={() => mutation.mutate("completed")}>
                    {mutation.isPending ? <Spinner /> : "End Tournament"}
                  </Button>
                  <div className="text-red-500 text-sm">
                    This will lock in the current state of the bracket and mark
                    the tournament as completed. You cannot undo this action.
                  </div>
                </>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
