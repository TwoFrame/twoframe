import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formOptions, useForm } from "@tanstack/react-form";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Button } from "@/components/ui/button";
import { Route } from "@/routes/admin.$code";
import { toast, Toaster } from "sonner";
import { useGetTournamentWithAdminCode } from "@/features/admin/hooks/useGetTournament";

export default function CaseDMatchForm({
  data,
  setOpen,
}: {
  data: {
    matchId: string;
    player1: string | null;
    player2: string | null;
    score1: number;
    score2: number;
  };
  setOpen: (open: boolean) => void;
}) {
  const { code } = Route.useParams();
  const queryClient = useQueryClient();
  const tournament = useGetTournamentWithAdminCode(code).data;

  const mutation = useMutation({
    mutationFn: async ({ value }: any) => {
      const response = await fetch(
        `${import.meta.env.VITE_TWOFRAME_SERVER_URL}/tournament/${tournament.tournament_id}/match/${data.matchId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            admin_code: code,
            player1: data.player1,
            player2: data.player2,
            score1: value.score1,
            score2: value.score2,
            winner: value.winner,
          }),
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to update match");
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

  const formOpts = formOptions({
    defaultValues: {
      score1: data.score1,
      score2: data.score2,
      winner: null as number | null,
    },
  });

  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      mutation.mutate({ value });
    },
  });

  return (
    <>
      <Toaster />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <div className="grid grid-cols-2 gap-4">
          {/* Player 1 Section */}
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Player 1</label>
              <div className="flex items-center gap-2">
                <span className="border-input h-9 flex-1 rounded-md border bg-muted px-3 py-2 text-sm flex items-center truncate">
                  {data.player1 || "TBD"}
                </span>
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
              </div>
            </div>

            <form.Field
              name="score1"
              children={(field) => (
                <div className="space-y-2">
                  <label htmlFor="points1" className="text-sm font-medium">
                    Score
                  </label>
                  <input
                    id="points1"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    onKeyDown={(e) => e.preventDefault()}
                    className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 dark:hover:bg-input/50 h-9 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
                  />
                </div>
              )}
            />
          </div>

          {/* Player 2 Section */}
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Player 2</label>
              <div className="flex items-center gap-2">
                <span className="border-input h-9 flex-1 rounded-md border bg-muted px-3 py-2 text-sm flex items-center truncate">
                  {data.player2 || "TBD"}
                </span>
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
              </div>
            </div>

            <form.Field
              name="score2"
              children={(field) => (
                <div className="space-y-2">
                  <label htmlFor="score2" className="text-sm font-medium">
                    Score
                  </label>
                  <input
                    id="points2"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    onKeyDown={(e) => e.preventDefault()}
                    className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 dark:hover:bg-input/50 h-9 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
                  />
                </div>
              )}
            />
          </div>
        </div>

        {/* Winner Selection */}
        <form.Field
          name="winner"
          children={(field) => (
            <div className="space-y-2">
              <label htmlFor="winner" className="text-sm font-medium">
                Winner
              </label>
              <NativeSelect
                id="winner"
                name="winner"
                value={field.state.value?.toString() || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  field.handleChange(value === "" ? null : Number(value));
                }}
              >
                <NativeSelectOption value="">No Winner</NativeSelectOption>
                <NativeSelectOption value="1">Player 1</NativeSelectOption>
                <NativeSelectOption value="2">Player 2</NativeSelectOption>
              </NativeSelect>
            </div>
          )}
        />

        <form.Subscribe selector={(state) => [state.canSubmit]}>
          {([canSubmit]) => (
            <Button type="submit" disabled={!canSubmit}>
              Save
            </Button>
          )}
        </form.Subscribe>
      </form>
    </>
  );
}
