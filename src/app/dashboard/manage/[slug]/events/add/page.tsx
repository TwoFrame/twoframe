"use client";

import { Form } from "@nextui-org/form";
import { useRouter } from "next/navigation";
import {
  useState,
  useEffect,
  useActionState,
  FormEvent,
  useContext,
} from "react";
import { DateValue, getLocalTimeZone, today } from "@internationalized/date";
import { Input, Textarea } from "@nextui-org/input";
import { DatePicker } from "@nextui-org/date-picker";
import { Button } from "@nextui-org/button";
import { createClient } from "@/utils/supabase/client";
import { Alert } from "@nextui-org/alert";
import TournamentContext from "@/app/dashboard/manage/[slug]/context";
import { createEventAction } from "./actions";
import Link from "next/link";

export default function CreateEventPage() {
  const context = useContext(TournamentContext);
  const router = useRouter();
  const [state, formAction] = useActionState(createEventAction, null);

  const [loginCheck, setLoginCheck] = useState(true);

  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isValidationErrorVisible, setIsValidationErrorVisible] =
    useState(false);
  const [isFailureVisible, setIsFailureVisible] = useState(false);

  const successTitle = "Successful creation";
  const failureTitle = "Something went wrong";
  const validationTitle = "Some fields are not valid";

  const successDescription =
    "Add another event or manage them on the events page";
  const [failureDescription, setFailureDescription] = useState("");
  const [validationDescription, setValidationDescription] = useState({});

  // Persist form input values
  const [formData, setFormData] = useState<{
    tournament_id: string | undefined;
    title: string;
    game: string;
    start_date: DateValue | null;
    entrant_limit: string;
    rules: string;
  }>({
    tournament_id: context?.tournament?.id,
    title: "",
    game: "",
    start_date: null,
    entrant_limit: "",
    rules: "",
  });

  // Update input values
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Update Date Picker values for start_date
  const handleStartDateChange = (value: DateValue | null) => {
    if (value == null) {
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      start_date: value,
    }));
  };
  const resetForm = () => {
    setFormData({
      tournament_id: context?.tournament?.id,
      title: "",
      game: "",
      start_date: null,
      entrant_limit: "",
      rules: "",
    });
  };

  const formatValidationError = (errors: {
    [key: string]: string[] | undefined;
  }): string => {
    return Object.entries(errors)
      .filter(([, messages]) => messages && messages.length > 0)
      .map(([_, messages]) => {
        const joinedMessages = messages?.join(", ");
        return `• ${joinedMessages}`; // Add a newline at the end of each bullet
      })
      .join("\n"); // Use empty join as newlines are already added
  };

  // Check if user is already logged in when page loads
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
      } else {
        setLoginCheck(false);
      }
    };

    checkUserLoggedIn();
  }, [router]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      tournament_id: context?.tournament?.id,
    }));
  }, [context?.tournament?.id]);

  // Listen for status udpates on tournament creation from the actions file
  useEffect(() => {
    console.log("form action state changed");
    if (state?.success == true) {
      console.log("setting success alert to visible");
      resetForm();
      setIsSuccessVisible(true);
    } else if (state?.success == false) {
      if (state?.validation_error != null) {
        console.log("setting validation alert to visible");
        setIsValidationErrorVisible(true);
        setValidationDescription(formatValidationError(state.validation_error));
        return;
      }
      if (state?.server_error != null) {
        console.log("setting failure alert to visible");
        setIsFailureVisible(true);
        setFailureDescription(state.server_error);
        console.log(state.server_error);
        return;
      }
    }
  }, [state]);

  if (loginCheck) {
    return null;
  }

  return (
    <section className="p-4 sm:w-2/3 relative left-1/2 -translate-x-1/2">
      <Button
        as={Link}
        href={`/dashboard/manage/${context?.tournament?.slug}/events/`}
        className="text-gray-500"
        variant="light"
      >
        &larr; All Events
      </Button>
      <h1 className="text-lg font-semibold text-center mb-2">Add Event</h1>
      <div className="w-[80%] sm:w-1/2 relative left-1/2 -translate-x-1/2">
        {isSuccessVisible && (
          <div className="w-full mx-auto flex items-center justify-center mb-2">
            <Alert
              color="success"
              description={successDescription}
              isVisible={isSuccessVisible}
              title={successTitle}
              variant="faded"
              onClose={() => setIsSuccessVisible(false)}
            />
          </div>
        )}

        {isFailureVisible && (
          <div className="w-full mx-auto flex items-center justify-center mb-2">
            <Alert
              color="danger"
              description={failureDescription}
              isVisible={isFailureVisible}
              title={failureTitle}
              variant="faded"
              onClose={() => setIsFailureVisible(false)}
            />
          </div>
        )}

        {isValidationErrorVisible && (
          <div className="w-full mx-auto flex items-center justify-center mb-2">
            <Alert
              color="warning"
              isVisible={isValidationErrorVisible}
              title={validationTitle}
              variant="faded"
              onClose={() => setIsValidationErrorVisible(false)}
            >
              <p className="whitespace-pre-wrap text-sm">
                {/* @ts-ignore */}
                {validationDescription}
                {/** @types/react complains about using {} in a React.Node so this error is suppressed */}
              </p>
            </Alert>
          </div>
        )}

        <Form
          className="w-full flex flex-col gap-4"
          validationBehavior="native"
          action={formAction}
        >
          <Input
            isRequired
            name="tournament_id"
            type="hidden"
            value={formData.tournament_id}
          />
          <Input
            isRequired
            label="Event Title"
            labelPlacement="outside"
            name="title"
            type="text"
            radius="sm"
            onChange={handleInputChange}
            value={formData.title}
          />

          <Input
            isRequired
            label="Game"
            labelPlacement="outside"
            name="game"
            type="text"
            radius="sm"
            onChange={handleInputChange}
            value={formData.game}
          />
          <Input
            isRequired
            label="Entrant Limit (2-128)"
            labelPlacement="outside"
            name="entrant_limit"
            type="number"
            radius="sm"
            onChange={handleInputChange}
            min="2"
            max="128"
            value={formData.entrant_limit}
          />

          <DatePicker
            isRequired
            disableAnimation
            name="start_date"
            granularity="minute"
            label="Start date"
            radius="sm"
            minValue={today(getLocalTimeZone())}
            onChange={handleStartDateChange}
            value={formData.start_date}
          />

          <Textarea
            isRequired
            isClearable
            name="rules"
            className="col-span-12 md:col-span-6"
            label="Rules"
            placeholder="Enter event rules"
            variant="flat"
            onChange={handleInputChange}
            onClear={() => {
              setFormData((prevData) => ({
                ...prevData,
                description: "",
              }));
            }}
            value={formData.rules}
          />

          <Button
            className="relative left-1/2 -translate-x-1/2"
            isDisabled={!context?.tournament?.slug}
            type="submit"
            variant="solid"
            radius="sm"
            color="primary"
          >
            Submit
          </Button>
        </Form>
      </div>
    </section>
  );
}
