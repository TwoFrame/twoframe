import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Route } from "@/routes/admin.$code";
import { toast, Toaster } from "sonner";
import { useGetTournamentWithAdminCode } from "@/features/admin/hooks/useGetTournament";

export default function CaseCMatchForm({
  data,
  setOpen,
}: {
  data: {
    matchId: string;
    sourcedPlayer: 1 | 2;
    player1: string | null;
    player2: string | null;
  };
  setOpen: (open: boolean) => void;
}) {
  const { code } = Route.useParams();
  const queryClient = useQueryClient();
  const tournament = useGetTournamentWithAdminCode(code).data;

  const undoPlayerSourceMutation = useMutation({
    mutationFn: async ({ value }: any) => {
      const response = await fetch(
        `${import.meta.env.VITE_TWOFRAME_SERVER_URL}/tournament/${tournament.tournament_id}/match/${data.matchId}/undo-source`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            admin_code: code,
            player_source: value.player_source,
          }),
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to undo source");
      }
    },
    onError: (e) => {
      toast.error(e.message);
    },
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["tournament", "admin", code],
      });
    },
  });

  return (
    <>
      <Toaster />
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Waiting for both source matches to be decided.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {/* Player 1 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Player 1</label>
            <div className="flex items-center gap-2">
              <span className="border-input h-9 flex-1 rounded-md border bg-muted px-3 py-2 text-sm flex items-center truncate">
                {data.player1 || "TBD"}
              </span>
              {data.sourcedPlayer === 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    undoPlayerSourceMutation.mutate({
                      value: { player_source: "player1" },
                    })
                  }
                  disabled={undoPlayerSourceMutation.isPending}
                >
                  Reset
                </Button>
              )}
            </div>
          </div>

          {/* Player 2 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Player 2</label>
            <div className="flex items-center gap-2">
              <span className="border-input h-9 flex-1 rounded-md border bg-muted px-3 py-2 text-sm flex items-center truncate">
                {data.player2 || "TBD"}
              </span>
              {data.sourcedPlayer === 2 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    undoPlayerSourceMutation.mutate({
                      value: { player_source: "player2" },
                    })
                  }
                  disabled={undoPlayerSourceMutation.isPending}
                >
                  Reset
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
