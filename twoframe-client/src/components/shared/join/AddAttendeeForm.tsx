import { useAddAttendee } from "@/components/shared/join/useAddAttendee";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "@tanstack/react-form";
import { formOpts } from "./attendeeForm.schema.";
import { formOptsWithoutCode } from "./attendeeForm.schema.";

interface Props {
  onSuccess?: (attendeeCode: string) => void;
  requireCode?: boolean;
  attendeeCode?: string;
}

export function AddAttendeeForm({
  onSuccess,
  requireCode = true,
  attendeeCode,
}: Props) {
  const mutation = useAddAttendee();
  const form = useForm({
    ...(requireCode ? formOpts : formOptsWithoutCode),
    onSubmit: async ({ value }) => {
      const payload = requireCode
        ? value
        : { ...value, attendee_code: attendeeCode };
      await mutation.mutateAsync(payload);
      form.reset();
      const passAttendeeCode = requireCode
        ? (value as any).attendee_code
        : attendeeCode!;
      onSuccess?.(passAttendeeCode);
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
            <label htmlFor={field.name} className="text-sm font-medium text-foreground">
              Your Name
            </label>
            <Input
              id={field.name}
              type="text"
              placeholder="e.g. John Smith"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              disabled={mutation.isPending}
              className="bg-muted/40"
            />
            {field.state.meta.isBlurred && field.state.meta.errors.length > 0 ? (
              <p className="text-destructive text-xs">
                {field.state.meta.errors[0]?.message}
              </p>
            ) : null}
          </div>
        )}
      </form.Field>

      {requireCode && (
        // @ts-ignore - Field exists only when requireCode is true
        <form.Field name="attendee_code">
          {(field) => (
            <div className="space-y-1.5">
              <label htmlFor={field.name} className="text-sm font-medium text-foreground">
                Attendee Code
              </label>
              <Input
                id={field.name}
                type="text"
                placeholder="Enter code from organizer"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={mutation.isPending}
                className="bg-muted/40"
              />
              {field.state.meta.isBlurred && field.state.meta.errors.length > 0 ? (
                <p className="text-destructive text-xs">
                  {field.state.meta.errors[0]?.message}
                </p>
              ) : null}
            </div>
          )}
        </form.Field>
      )}

      <Button
        type="submit"
        disabled={mutation.isPending}
        className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-lg hover:shadow-green-500/50 transition-all duration-300 disabled:opacity-50"
      >
        {mutation.isPending ? <Spinner /> : "Join Tournament"}
      </Button>
    </form>
  );
}