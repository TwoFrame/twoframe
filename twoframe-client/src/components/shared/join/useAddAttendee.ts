import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAddAttendee() {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(
        `${import.meta.env.VITE_TWOFRAME_SERVER_URL}/attendee`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
      if (!response.ok) {
        throw new Error("Failed to create attendee for tournament");
      }
    },
    onError: () => toast.error("Failed to join tournament"),
    onSuccess: () => toast.success("Joined tournament successfully"),
  });
}
