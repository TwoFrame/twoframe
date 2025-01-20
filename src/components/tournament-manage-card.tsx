import { TournamentData } from "@/app/dashboard/tournaments/types";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Divider } from "@nextui-org/divider";
import { Calendar, Ellipsis, Eye, Trash } from "lucide-react";
import { useEffect } from "react";
import { formatDateRange, formatTimestampWithDate } from "@/app/_lib/functions";
import PublicChip from "./public-chip";

/**
 * Tournament card that is displayed in the managed sections of the Collections Page
 * @param tournament the tournament data
 */
export default function TournamentManageCard({
  tournament,
}: {
  tournament: TournamentData;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    console.log(tournament.created_at);
  }, []);

  return (
    <>
      <Modal backdrop="opaque" isOpen={isOpen} onClose={onClose} radius="sm">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h2 className="text-white font-semibold">
                  Delete {tournament.title}?
                </h2>
              </ModalHeader>

              <ModalBody>
                <p className="text-color-light-grey">
                  This will clear all the data including events. You cannot
                  revert this action once it&apos;s complete.
                </p>
              </ModalBody>

              <ModalFooter>
                <Button variant="light" onPress={onClose} radius="sm">
                  Close
                </Button>
                <Button color="danger" onPress={onClose} radius="sm">
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Card className="w-full mb-6" radius="md">
        <CardHeader className="flex justify-between">
          <PublicChip is_public={tournament.public!} />

          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="light" size="sm">
                <Ellipsis size={16} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Tournament Card Actions">
              <DropdownItem
                key="view"
                startContent={<Eye size={16} />}
                href={`/dashboard/manage/${tournament.slug}`}
              >
                View
              </DropdownItem>
              <DropdownItem
                key="delete"
                startContent={<Trash size={16} />}
                onPress={onOpen}
              >
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardHeader>

        <CardBody className="py-0">
          <div className="flex flex-col">
            <h3 className="text-md font-semibold">{tournament.title}</h3>
            <span className="flex gap-2 mt-2">
              <Calendar size={16} className="text-color-light-grey" />
              <p className="text-xs text-color-light-grey">
                {formatDateRange(tournament.start_date, tournament.end_date)}
              </p>
            </span>
          </div>
        </CardBody>

        <Divider className="mt-4" />

        <CardFooter className="py-4">
          <p className="text-xs text-color-light-grey">
            Created {formatTimestampWithDate(tournament.created_at)}
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
