"use client";

import { useEffect, useState } from "react";
import { logout } from "@/app/(auth)/logout/actions";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";


export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error && data.user) {
        setUser(data.user); 
      } else {
        setUser(null); 
      }
      setLoading(false);
    };

    fetchUser();
  }); 

  const handleLogout = async () => {
    await logout();
  };

  if (loading) {
    return (
      <div className="navbar bg-base-100 fixed top-0 left-0 w-full">
        <a className="btn btn-ghost text-xl">twoframe</a>
        <div className="ml-auto animate-pulse">
          <div className="btn btn-primary w-20 h-8"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="navbar bg-base-100 fixed top-0 left-0 w-full flex justify-between items-center px-4">
      <a className="btn btn-ghost text-xl">twoframe</a>
      {user ? (
        <button className="btn btn-primary" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <div className="flex space-x-2">
          <a className="btn btn-primary" href="/login">
            Login
          </a>
          <a className="btn btn-primary" href="/signup">
            Sign Up
          </a>
        </div>
      )}
    </div>
  );
}