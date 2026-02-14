import { useAddAttendee } from "@/components/shared/join/useAddAttendee";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useForm} from "@tanstack/react-form";
import { formOpts } from "./attendeeForm.schema.";

interface Props {
    onSuccess?: () => void;
}

export function AddAttendeeForm( { onSuccess }: Props) {
  const mutation = useAddAttendee();
  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync(value);
      form.reset();
      onSuccess?.();
    },
  });

  return (
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
  );
}