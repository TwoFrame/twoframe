"use client";

import Link from "next/link";
import { login } from "@/app/(auth)/login/actions";
import { useState, useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {Button} from "@nextui-org/button";
import {Spinner} from "@nextui-org/spinner";

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction] = useActionState(login, null);
  const [loginCheck, setLoginCheck] = useState(true);

  // If the user is already logged in, force redirect them back to the main page for now
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        console.log('going back to /')
        router.push("/dashboard/tournaments/explore")

      } else {
        console.log("no user")
        setLoginCheck(false);
      }
    };

    checkUserLoggedIn();
  }, [router]);

  // Keep track of the login state
  useEffect(()=> {
    // TODO: go back to main page for now. Will have to navigate to a dashboard later on
    if (state?.success == true) {
      router.push("/dashboard/tournaments/explore")
    }
  }, [state, router])


  if (loginCheck) {
    return (
      <section className="flex flex-col justify-center items-center">
        <Spinner color="default"/>
        <p className="text-color-light-grey mt-4">Checking credentials</p>
      </section>
      
    )
  }

  return (
    <section className="flex flex-col w-full items-center justify-center">
      <h1 className="text-5xl font-extrabold text-white">Login</h1>
        <div className="items-center text-center">
          <form
            action={formAction}
            className="flex flex-col gap-4 w-64 sm:w-72 mt-8"
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
            <Button type="submit" className="text-white" size="md" radius="sm">
              Log In
            </Button>
          </form>
          <p className="text-color-light-grey">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="no-underline text-accent text-white">
              Sign up
            </Link>
          </p>
        </div>
      </section>
  );
}
