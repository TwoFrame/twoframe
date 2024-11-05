import "@/app/styles/globals.css";

export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <div className="w-screen h-screen">{children}</div>;
}
