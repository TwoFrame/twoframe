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
    onSuccess: () => void;
};

export function AddAttendeeDialog({ onSuccess }: Props) {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Attendee</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Attendee</DialogTitle>
            </DialogHeader>

            <AddAttendeeForm
              onSuccess={() => {
                setOpen(false);
                onSuccess();
              }}
            />
          </DialogContent>
        </Dialog>
    )
}