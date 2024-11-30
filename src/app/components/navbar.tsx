"use client";

import { logout } from "@/app/(auth)/logout/actions";

export default function Navbar() {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="navbar bg-base-100 fixed top-0 left-0 w-full">
      <a className="btn btn-ghost text-xl">daisyUI</a>
      <button className="btn btn-primary ml-auto" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}