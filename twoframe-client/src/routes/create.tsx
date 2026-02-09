import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

//using tanstack form for easier data validation and submission handling
interface TournamentFormEntry {
  name: string;
  date: string;
}

const defaultFormValues = {
  name: "",
  date: "",
};

const formSchema = z.object({
  name: z
    .string()
    .min(4, "Tournament name must have at least 4 characters")
    .max(64, "Tournament name must be at most 64 characters"),
  date: z
    .string()
    .refine(
      (val) => val && new Date(val) > new Date(),
      "Event must be in the future",
    ),
});

export const Route = createFileRoute("/create")({
  component: CreateTournamentPage,
});

function CreateTournamentPage() {
  const navigate = useNavigate();
  const [submissionFailure, setSubmissionFailure] = useState<string | null>(
    null,
  );

  const mutation = useMutation({
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

      const data = await res.json();

      return data;
    },
    onSuccess: (data) => {
      navigate({
        to: "/admin/$code",
        params: {
          code: data.admin_code,
        },
      });
    },
    onError: (error) => {
      setSubmissionFailure(error.message);
    },
  });
  const form = useForm({
    defaultValues: defaultFormValues,
    validators: {
      onChange: formSchema,
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      mutation.mutateAsync(value);
    },
  });

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Tournament</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field name="name">
          {(field) => (
            <>
              <input
                className="w-full mb-2 p-2 border rounded"
                placeholder={
                  field.state.meta.isTouched ? undefined : `Tournament name`
                }
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={mutation.isPending}
              />
              {field.state.meta.isBlurred &&
              field.state.meta.errors.length > 0 ? (
                <p className="text-red-500 text-sm mt-1">
                  {field.state.meta.errors[0]?.message}
                </p>
              ) : null}
            </>
          )}
        </form.Field>

        <form.Field name="date">
          {(field) => (
            <>
              <input
                type="date"
                className="w-full mb-2 p-2 border rounded"
                placeholder={
                  field.state.meta.isTouched ? undefined : `Tournament date`
                }
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={mutation.isPending}
              />
              {field.state.meta.isBlurred && field.state.meta.errors.length ? (
                <p className="text-red-500 text-sm mt-1">
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
              Create
            </Button>
          )}
        </form.Subscribe>
      </form>

      {submissionFailure ? (
        <p className="text-red-500 text-sm mt-1">{submissionFailure}</p>
      ) : null}
    </div>
  );
}
