'use client';

import Link from "next/link";
import { login } from "@/app/(auth)/login/actions";
import { useActionState } from "react";

export default function LoginPage() {
  const [state, formAction] = useActionState(login, null);

  return (
    <div className="flex flex-col items-center prose relative left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
      <h1 className="">Login</h1>
      <div className="relative card bg-neutral text-neutral-content w-96 border border-neutral-content">
        <div className="card-body items-center text-center">
          <form
            action={formAction}
            className="flex flex-col gap-4 w-64 sm:w-72"
          >
            <div className="flex flex-col gap-2">
            <input
                name="email"
                type="text"
                placeholder="Email"
                className="input w-full max-w-xs"
              />
              {state?.errors?.email && <p className="text-error text-xs">{state.errors.email}</p>}
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="input w-full max-w-xs"
              />
              {state?.errors?.password && <p className="text-error text-xs">{state.errors.password}</p>}
            </div>
            <input type="submit" value="Login" className="btn btn-primary" />
          </form>
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="no-underline text-accent">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
