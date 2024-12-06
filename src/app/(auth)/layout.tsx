import "@/app/styles/globals.css";
import AuthNavbar from "@/app/components/auth-navbar";

export default function BaseLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-screen min-h-screen h-screen w-screen bg-base-200">
      <AuthNavbar />
      {children}
    </div>
  );
}
