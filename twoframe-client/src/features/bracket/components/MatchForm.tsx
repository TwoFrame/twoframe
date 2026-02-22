import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formOptions, useForm } from "@tanstack/react-form";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Button } from "@/components/ui/button";
import { Route } from "@/routes/admin.$code";
import { toast, Toaster } from "sonner";

export default function MatchForm({
  data,
  setOpen,
}: {
  data: {
    round: number;
    match: number;
    player1: string | null;
    player2: string | null;
    score1: number;
    score2: number;
    winner: 1 | 2 | null;
    target: string | null
    playerSources: Record<string, [string, boolean]>;
    attendees: {
      name: string;
      attendee_id: string;
      tournament_id: string;
    }[];
  };
  setOpen: (open: boolean) => void;
}) {
  const hasPlayer1Source = "player1" in data.playerSources;
  const hasPlayer2Source = "player2" in data.playerSources;
  const { code } = Route.useParams();
  const queryClient = useQueryClient();

  // Get the tournament data from the c
  const tournamentData = queryClient.getQueryData<any>(["tournament", code]);
  const tournamentId = tournamentData?.tournament_id;

  const mutation = useMutation({
    mutationFn: async ({ value }: any) => {
      const matchId = `R${data.round}M${data.match}`;
      const response = await fetch(
        `${import.meta.env.VITE_TWOFRAME_SERVER_URL}/tournament/${tournamentId}/match/${matchId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            admin_code: code,
            player1: value.player1,
            player2: value.player2,
            score1: value.score1,
            score2: value.score2,
            winner: value.winner,
          }),
        },
      );
      if (!response.ok) {
        throw new Error("Failed to update match");
      }
    },
    onError: () => {
      toast.error("Failed to update match");
    },
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["tournament", code],
      });
    },
  });

  const formOpts = formOptions({
    defaultValues: {
      player1: data.player1 || "",
      player2: data.player2 || "",
      score1: data.score1,
      score2: data.score2,
      winner: data.winner || (null as number | null),
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
            <form.Field
              name="player1"
              children={(field) => (
                <div className="space-y-2">
                  <label htmlFor="player1" className="text-sm font-medium">
                    Player 1
                  </label>
                  {hasPlayer1Source ? (
                    <div className="h-9 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm text-muted-foreground">
                      {field.state.value || "TBD"}
                    </div>
                  ) : (
                    <NativeSelect
                      id="player1"
                      name="player1"
                      value={field.state.value}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                      }}
                    >
                      <NativeSelectOption value="">
                        Select player...
                      </NativeSelectOption>
                      {data.attendees.map((attendee: any) => (
                        <NativeSelectOption
                          key={attendee.attendee_id}
                          value={attendee.name}
                        >
                          {attendee.name}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  )}
                </div>
              )}
            />

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
            <form.Field
              name="player2"
              children={(field) => (
                <div className="space-y-2">
                  <label htmlFor="player2" className="text-sm font-medium">
                    Player 2
                  </label>
                  {hasPlayer2Source ? (
                    <div className="h-9 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm text-muted-foreground">
                      {field.state.value || "TBD"}
                    </div>
                  ) : (
                    <NativeSelect
                      id="player2"
                      name="player2"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    >
                      <NativeSelectOption value="">
                        Select player...
                      </NativeSelectOption>
                      {data.attendees.map((attendee: any) => (
                        <NativeSelectOption
                          key={attendee.attendee_id}
                          value={attendee.name}
                        >
                          {attendee.name}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  )}
                </div>
              )}
            />

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
