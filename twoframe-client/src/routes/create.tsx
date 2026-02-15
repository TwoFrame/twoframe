import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { formSchema } from "@/features/create/createTournament.schema";
import { defaultFormValues } from "@/features/create/createTournament.schema";
import { useCreateTournament } from "@/features/create/hooks/useCreateTournamnet";

export const Route = createFileRoute("/create")({
  component: CreateTournamentPage,
});

function CreateTournamentPage() {
  const mutation = useCreateTournament();
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
    </div>
  );
}
