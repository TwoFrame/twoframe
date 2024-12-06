"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { logout } from "@/app/(auth)/logout/actions";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      setUser(error ? null : data.user); // Set user or null based on the result
    };

    if (user === undefined) {
      fetchUser();
    }
  }, [user]);

  const handleLogout = async () => {
    const { success, error } = await logout();
    if (success) {
      setUser(null);
      router.push("/");
    } else {
      router.push("/error");
    }
  };

  // Show nothing (or a placeholder) while `user` is undefined
  if (user === undefined) {
    return (
      <div className="navbar bg-base-100 fixed top-0 left-0 w-full">
        <Link href="/" className="btn btn-ghost text-xl">
          twoframe
        </Link>
        <div className="ml-auto animate-pulse">
          <div className="btn btn-primary w-20 h-8"></div>
        </div>
      </div>
    );
  }

  // Render the navbar once `user` is resolved (either logged in or null)
  return (
    <div className="navbar bg-base-100 fixed top-0 left-0 w-full flex justify-between items-center px-4">
      <Link className="btn btn-ghost text-xl" href="/">
        twoframe
      </Link>
      {user ? (
        <button className="btn btn-primary" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <div className="flex space-x-2">
          <Link className="btn btn-primary" href="/login">
            Login
          </Link>
          <Link className="btn btn-primary" href="/signup">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}
