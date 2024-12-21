"use client";

import { useState, useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {createTournamentAction} from "./actions";

export default function CreateTournamentPage() {
  const router = useRouter();
  const [state, formAction] = useActionState(createTournamentAction, null);
  const [loginCheck, setLoginCheck] = useState(true);

  const [inputtedFormData, setInputtedFormData] = useState({
    title: "",
    start_date: "",
    end_date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputtedFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  if (loginCheck) {
    return null;
  }

  return (
    <div className="">
      <h1 className="text-center text-4xl font-extrabold relative top-24 z-100">
        Create a Tournament
      </h1>

      <div className="relative card bg-neutral text-neutral-content  w-[400px] sm:w-[500px] left-1/2 -translate-x-1/2 top-28 border border-neutral-content">
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

              <input
                type="submit"
                value="Create Tournament"
                className="btn btn-primary mt-4"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
