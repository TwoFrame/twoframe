"use client";

import Link from "next/link";
import { login } from "@/app/(auth)/login/actions";
import { useState, useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction] = useActionState(login, null);
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
    <div className="flex flex-col prose items-center relative left-1/2 -translate-x-1/2 top-1/4 -translate-y-1/4">
      <h1 className="text-5xl font-extrabold">Login</h1>
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
              {state?.errors?.email && (
                <p className="text-error text-xs">{state.errors.email}</p>
              )}
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="input w-full max-w-xs"
              />
              {state?.errors?.password && (
                <p className="text-error text-xs">{state.errors.password}</p>
              )}
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
