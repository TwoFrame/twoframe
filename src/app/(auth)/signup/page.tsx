"use client";

import Link from "next/link";
import { signup } from "@/app/(auth)/signup/actions";
import { useState, useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Spinner } from "@nextui-org/spinner";

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
        router.push("/dashboard/tournaments/explore")
      } else {
        setLoginCheck(false);
      }
    };

    checkUserLoggedIn();
  }, [router]);

  // Keep track of the sign up state
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
      <h1 className="text-5xl font-extrabold text-white">Sign up</h1>
      <div>
        <div className="card-body items-center text-center">
          <form
            action={formAction}
            className="flex flex-col gap-4 w-64 sm:w-72 mt-8"
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
            <input type="submit" value="Sign Up" className="text-color-light-grey" />
          </form>
          <p className="text-color-light-grey">
            Already have an account?{" "}
            <Link href="/login" className="no-underline text-accent text-white">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
