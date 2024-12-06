"use client";

import Link from "next/link";
import { signup } from "@/app/(auth)/signup/actions";
import { useState, useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function SignUpPage() {
  const router = useRouter();
  const [state, formAction] = useActionState(signup, null);
  const [loginCheck, setLoginCheck] = useState(true);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        router.push("/");
      } else {
        setLoginCheck(false);
      }
    };

    checkUserLoggedIn();
  }, [router]);

  if (loginCheck) {
    return null; // Return null or a loading indicator while checking
  }

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
                  required
                />
                {state?.errors?.email && (
                  <p className="text-error text-xs">{state.errors.email}</p>
                )}
              </div>
              <div className="flex flex-col gap-0 my-0">
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  className="input input-bordered w-full max-w-xs"
                  required
                />
                {state?.errors?.username && (
                  <p className="text-error text-xs">{state.errors.username}</p>
                )}
              </div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs"
                required
              />
              <input
                name="cpassword"
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered w-full max-w-xs"
                required
              />
              {state?.errors?.password && (
                <p className="text-error text-xs">{state.errors.password}</p>
              )}
              {state?.errors?.cpassword && (
                <p className="text-error text-xs">{state.errors.cpassword}</p>
              )}
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
