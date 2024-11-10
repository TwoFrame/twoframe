"use client";

import Link from "next/link";
import { signup } from "@/app/(auth)/signup/actions";
import { useActionState } from "react";

export default function SignUpPage() {
  const [state, formAction] = useActionState(signup, null);

  return (
    <div className="flex flex-col items-center prose relative left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
      <h1>Sign up</h1>
      <div className="relative card bg-neutral text-neutral-content w-96 border border-neutral-content">
        <div className="card-body items-center text-center">
          <form
            action={formAction}
            className="flex flex-col gap-4 w-64 sm:w-72"
          >
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-0 my-0">
                <input
                  name="email"
                  type="text"
                  placeholder="Email"
                  className="input w-full max-w-xs"
                />
                {state?.errors?.email && <p className="text-error text-xs">{state.errors.email}</p>}
              </div>
              <div className="flex flex-col gap-0 my-0">
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  className="input input-bordered w-full max-w-xs"
                />
                {state?.errors?.username && <p className="text-error text-xs">{state.errors.username}</p>}
              </div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs"
              />
              <input
                name="cpassword"
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered w-full max-w-xs"
              />
              {state?.errors?.password && <p className="text-error text-xs">{state.errors.password}</p>}
              {state?.errors?.cpassword && <p className="text-error text-xs">{state.errors.cpassword}</p>}
            </div>
            <input type="submit" value="Sign Up" className="btn btn-primary" />
          </form>
          <p>
            Already have an account?{" "}
            <Link href="/login" className="no-underline text-accent">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
