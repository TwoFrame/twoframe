import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { TournamentFormEntry } from "@/features/create/createTournament.schema";

export function  useCreateTournament() {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async ({ name, date }: TournamentFormEntry) => {
        //convert date to iso string which is in UTC. for now it will be effed cause we are not taking into account a user's timezone
        //honestly doesnt matter just leave for now
        const res = await fetch(
            `${import.meta.env.VITE_TWOFRAME_SERVER_URL}/tournament`,
            {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, date: new Date(date).toISOString() }),
            },
        );

        if (!res.ok) {
            throw new Error("Something went wrong. Failed to create tournament.");
        }

      return res.json();
    },
    onSuccess: (data) => {
      navigate({
        to: "/admin/$code",
        params: {
          code: data.admin_code,
        },
      });
    },
  });
}