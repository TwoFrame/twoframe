import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddAttendeeForm } from "@/components/shared/join/AddAttendeeForm";

type Props = {
  onSuccess?: (attendeeCode?: string) => void;
  attendeeCode?: string;
};

export function AddAttendeeDialog({ onSuccess, attendeeCode }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-md hover:shadow-green-500/40 transition-all duration-300">
          Add Attendee
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Attendee</DialogTitle>
        </DialogHeader>

        <AddAttendeeForm
          onSuccess={(code) => {
            setOpen(false);
            onSuccess?.(code);
          }}
          requireCode={false}
          attendeeCode={attendeeCode}
        />
      </DialogContent>
    </Dialog>
  );
}
