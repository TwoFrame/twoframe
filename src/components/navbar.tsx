"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { logout } from "@/app/(auth)/logout/actions";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import AuthNavigationBar from "./auth-navbar";

export default function NavigationBar() {
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
    const { success } = await logout();
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
      <AuthNavigationBar/>
    //   <div className="bg-background-default fixed top-0 left-0 w-full h-[80px]">
    //     <Link href="/" className="text-white text-xl">
    //       twoframe
    //     </Link>
    //     <div className="ml-auto animate-pulse">
    //       <div className="btn btn-primary w-20 h-8"></div>
    //     </div>
    //   </div>
     );
  }

  // Render the navbar once `user` is resolved (either logged in or null)
  return (
    <Navbar maxWidth="xl" height="80px" className="bg-background-default/30 backdrop-blur-lg">
      <NavbarBrand>
        <Link className="text-white text-3xl font-micro" href="/">twoframe</Link>
      </NavbarBrand>

      <NavbarContent justify="center">

      {user ? (
        <div className="flex space-x-2">
          <NavbarItem className="text-white" onClick={handleLogout}>
            <Button as={Link} href="/dashboard/tournaments/explore" variant="light" radius="sm" >
              Dashboard
            </Button>
          </NavbarItem>
          <NavbarItem className="text-white" onClick={handleLogout}>
            <Button onPress = {handleLogout} radius="sm" >
              Log Out
            </Button>
          </NavbarItem>
        </div>
      ) : (
        <div className="flex space-x-2">
          <NavbarItem className="text-white">
            <Button as={Link} href="/login" variant="light" size="md" radius="sm">
              Log In
            </Button>
          </NavbarItem>
          <NavbarItem className="text-white">
          <Button as={Link} href="/signup" className="bg-white text-black" size="md" radius="sm">
            Sign Up
          </Button>

        </NavbarItem>
        </div>
      )}
      </NavbarContent>

      
    </Navbar>


    /*
    <div className="bg-background-default h-[80px] max-w-[1024px] mx-auto w-full flex justify-between px-8 fixed top-0 left-0 items-center">
      <Link className="text-white text-xl" href="/">
        twoframe
      </Link>
      {user ? (
        <button className="text-white" onClick={handleLogout}>
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
    */
  );
}
