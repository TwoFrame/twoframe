"use client";

import { useState, useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {createTournamentAction} from "./actions";
import {Form} from "@nextui-org/form";
import { Button } from "@nextui-org/button";
import { DatePicker } from "@nextui-org/date-picker";
import { Input } from "@nextui-org/input";
import {Alert} from "@nextui-org/alert";
import {getLocalTimeZone, today} from "@internationalized/date";
import Link from "next/link";

export default function CreateTournamentPage() {
  const router = useRouter();
  const [state, formAction] = useActionState(createTournamentAction, null);
  const [loginCheck, setLoginCheck] = useState(true);

  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isValidationErrorVisible, setIsValidationErrorVisible] = useState(false);
  const [isFailureVisible, setIsFailureVisible] = useState(false);

  const successTitle = "Successful creation";
  const failureTitle = "Something went wrong";
  const successDescription = "Visit the Manage tab to add brackets and other details!";

  const [failureDescription, setFailureDescription] = useState("");
  const [validationDescription, setValidationDescription] = useState("");

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

  useEffect(()=> {
    console.log("form action state changed")
    if (state?.success == true) {
      console.log("setting success alert to visible")
      setIsSuccessVisible(true)
    }
    if (state?.validation_error != null) {
      console.log("setting validation alert to visible")
      setIsValidationErrorVisible(true)
      setValidationDescription(state.validation_error)
    }
    if (state?.server_error != null) {
      console.log("setting failure alert to visible")
      setIsFailureVisible(true)
      setFailureDescription(state.server_error)
    }

  }, [state])

  if (loginCheck) {
    return null;
  }

  return (
    <section className="flex flex-col bg-background-default">

      {/* Custom dashboard nav title bar that displays basic info */}
      <div className="dashboard-nav flex items-center" >
        <h1 className="text-xl font-semibold">
          Create a Tournament
        </h1>
      </div>


      <div className="max-w-xl p-4">

      {isSuccessVisible && (
        <div className="w-full mx-auto flex items-center justify-center">
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
        <Alert
          color="danger"
          description={failureDescription}
          isVisible={isFailureVisible}
          title={failureTitle}
          variant="faded"
          onClose={() => setIsFailureVisible(false)}
        />)
      }

      {isValidationErrorVisible && (
        <Alert
          color="danger"
          description={validationDescription}
          isVisible={isFailureVisible}
          title={failureTitle}
          variant="faded"
          onClose={() => setIsFailureVisible(false)}
        />)
      }
       <Form
        className="w-full max-w-xl flex flex-col gap-4"
        validationBehavior="native"
        action={formAction}
      >
        
        <Input
          isRequired
          label="Tournament name"
          labelPlacement="outside"
          name="title"
          type="text"
          radius="sm"
        />

        <DatePicker
          isRequired
          disableAnimation
          name="start_date"
          granularity="minute"
          label="Start date"
          radius="sm"
          minValue={today(getLocalTimeZone())}
        />

        <DatePicker
          isRequired
          disableAnimation
          name="end_date"
          granularity="minute"
          label="End date"
          radius="sm"
          minValue={today(getLocalTimeZone())}

        />

        <Button type="submit" variant="solid" radius="sm">
          Submit
        </Button>
      </Form> 

   
      
      

      </div>
      {/* <div className="relative card bg-neutral text-neutral-content  w-[400px] sm:w-[500px] left-1/2 -translate-x-1/2 top-28 border border-neutral-content">
        <div className="card-body items-center text-center">
          <form action={formAction}>
            <div className="flex flex-col gap-1">
              <label className="form-control w-full max-w-xs">
                <div className="label m-0 p-0 pl-1">
                  <span className="label-text font-extrabold text-md">
                    Tournament Title
                  </span>
                </div>
                <input
                  type="text"
                  name="title"
                  placeholder="My Tournament"
                  className="input input-bordered w-full max-w-xs focus:outline-none"
                  value={inputtedFormData.title}
                  onChange={handleChange}
                />
                {state?.errors?.title && (
                  <p className="text-error text-xs">{state.errors.title}</p>
                )}
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label m-0 p-0 pl-1">
                  <span className="label-text font-extrabold text-md">
                    Start Date
                  </span>
                </div>
                <input
                  type="datetime-local"
                  name="start_date"
                  className="input input-bordered w-full max-w-xs focus:outline-none"
                  value={inputtedFormData.start_date}
                  onChange={handleChange}
                  required
                />
                {state?.errors?.start_date && (
                  <p className="text-error text-xs">
                    {state.errors.start_date}
                  </p>
                )}
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label m-0 p-0 pl-1">
                  <span className="label-text font-extrabold text-md">
                    End Date
                  </span>
                </div>
                <input
                  type="datetime-local"
                  name="end_date"
                  className="input input-bordered w-full max-w-xs focus:outline-none"
                  value={inputtedFormData.end_date}
                  onChange={handleChange}
                  required
                />
                {state?.errors?.end_date && (
                  <p className="text-error text-xs">{state.errors.end_date}</p>
                )}
              </label>


              <Button type="submit" variant="solid">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div> */}
    </section>
  );
}
