import { createFileRoute } from "@tanstack/react-router";

import { useMutation } from "@tanstack/react-query";
import { formOptions, useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export const Route = createFileRoute("/join")({
  component: JoinTournamentPage,
});
interface JoinFormEntry {
  attendee_code: string;
  name: string;
}

const joinFormSchema = z.object({
  name: z
    .string()
    .min(1, "Enter your name")
    .max(32, "Name must be less than 32 characters"),
  attendee_code: z.string().length(8, "Invalid code"),
});

const formOpts = formOptions({
  defaultValues: {
    name: "",
    attendee_code: "",
  },
  validators: {
    onMount: joinFormSchema,
    // onBlur: joinFormSchema,
    onChange: joinFormSchema,
  },
});

function JoinTournamentPage() {
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      //fake waiting for testing
      // await new Promise((resolve) => setTimeout(resolve, 5000))
      const response = await fetch(
        `${import.meta.env.VITE_TWOFRAME_SERVER_URL}/attendee`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to create attendee for tournament");
      }
    },
    onError: () => {
      toast.error("Failed to join tournament");
    },
    onSuccess: () => {
      toast.success("Joined tournament successfully");
    },
  });
  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync(value);
      form.reset();
    },
  });
  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      <Toaster />
      <Card className="w-[90%] max-w-[450px]">
        <CardHeader>
          <CardTitle>Join a Tournament</CardTitle>
          <CardDescription>
            Enter your name and the tournament's attendee code to join
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <form.Field name="name">
              {(field) => (
                <>
                  <label htmlFor={field.name}>Attendee Name</label>
                  <input
                    id={field.name}
                    className="w-full mb-0 p-2 border rounded"
                    type="text"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    disabled={mutation.isPending}
                  />
                  {field.state.meta.isBlurred &&
                  field.state.meta.errors.length > 0 ? (
                    <p className="text-red-500 text-sm mt-0 mb-2">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  ) : null}
                </>
              )}
            </form.Field>

            <form.Field name="attendee_code">
              {(field) => (
                <>
                  <label htmlFor={field.name}>Attendee Code</label>
                  <input
                    id={field.name}
                    className="w-full mb-2 p-2 border rounded"
                    type="text"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    disabled={mutation.isPending}
                  />
                  {field.state.meta.isBlurred &&
                  field.state.meta.errors.length > 0 ? (
                    <p className="text-red-500 text-sm mt-0 mb-4">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  ) : null}
                </>
              )}
            </form.Field>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isPristine]}
            >
              {([canSubmit, isPristine]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || isPristine || mutation.isPending}
                >
                  {mutation.isPending ? <Spinner /> : "Join"}
                </Button>
              )}
            </form.Subscribe>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
