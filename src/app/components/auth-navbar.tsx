import Link from "next/link";
export default function AuthNavbar() {
  // Render the navbar once `user` is resolved (either logged in or null)
  return (
    <div className="navbar bg-base-100 w-full flex justify-center items-center px-4 z-10">
      <Link className="btn btn-ghost text-xl" href="/">
        twoframe
      </Link>
    </div>
  );
}
