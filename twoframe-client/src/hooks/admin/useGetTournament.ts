import { useQuery } from "@tanstack/react-query";

export function useTournament(code: string) {
  return useQuery({
    queryKey: ["tournament", code],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_TWOFRAME_SERVER_URL}/tournament/admin/${code}`
      );
      return response.json();
    },
  });
}