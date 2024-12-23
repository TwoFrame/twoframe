import { Navbar, NavbarBrand } from "@nextui-org/navbar";
import Link from "next/link";

export default function AuthNavigationBar() {
  // Render the navbar once `user` is resolved (either logged in or null)
  return (
    <Navbar maxWidth="xl" height="80px" className="bg-background-default/30 backdrop-blur-lg">
      <NavbarBrand>
        <Link className="text-white text-3xl font-micro" href="/">twoframe</Link>
      </NavbarBrand>
    </Navbar>
  );
}
