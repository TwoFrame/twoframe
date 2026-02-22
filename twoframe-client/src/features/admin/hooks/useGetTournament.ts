import { useQuery } from "@tanstack/react-query";

export function useGetTournamentWithAdminCode(adminCode: string) {
  return useQuery({
    queryKey: ["tournament", "admin", adminCode],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_TWOFRAME_SERVER_URL}/tournament/admin/${adminCode}`,
      );
      let result = await response.json();
      return result;
    },
  });
}
