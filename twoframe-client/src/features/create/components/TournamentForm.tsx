import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { formSchema } from "@/features/create/createTournament.schema";
import { defaultFormValues } from "@/features/create/createTournament.schema";
import type { TournamentFormEntry } from "@/features/create/createTournament.schema";

interface TournamentFormProps {
  onSubmit: (values: TournamentFormEntry) => Promise<void>;
  isSubmitting: boolean;
}

export function TournamentForm({
  onSubmit,
  isSubmitting,
}: TournamentFormProps) {
  const form = useForm({
    defaultValues: defaultFormValues,
    validators: {
      onChange: formSchema,
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <form.Field name="name">
        {(field) => (
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Tournament Name
            </label>
            <Input
              placeholder="e.g. Summer Smash 2025"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              disabled={isSubmitting}
              className="bg-muted/40"
            />
            {field.state.meta.isBlurred &&
            field.state.meta.errors.length > 0 ? (
              <p className="text-destructive text-xs">
                {field.state.meta.errors[0]?.message}
              </p>
            ) : null}
          </div>
        )}
      </form.Field>

      <form.Field name="date">
        {(field) => (
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Date</label>
            <Input
              type="date"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              disabled={isSubmitting}
              className="bg-muted/40"
            />
            {field.state.meta.isBlurred && field.state.meta.errors.length ? (
              <p className="text-destructive text-xs">
                {field.state.meta.errors[0]?.message}
              </p>
            ) : null}
          </div>
        )}
      </form.Field>

      <form.Subscribe selector={(state) => [state.canSubmit, state.isPristine]}>
        {([canSubmit, isPristine]) => (
          <Button
            type="submit"
            disabled={!canSubmit || isPristine || isSubmitting}
            className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-lg hover:shadow-green-500/50 transition-all duration-300 disabled:opacity-50"
          >
            Create Tournament
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
