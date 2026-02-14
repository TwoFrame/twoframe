import { useQuery } from "@tanstack/react-query";

//this query is dependent on the first query which grabs the tournament
//once the tournament is succesfully grabbed, we can perform a fetch of the attendees
export function useGetAttendees(code: string, tournamentId?: string) {
  return useQuery({
    queryKey: ["attendees", code],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_TWOFRAME_SERVER_URL}/tournament/${tournamentId}/attendees`
      );
      return response.json();
    },
    enabled: !!tournamentId,
  });
}