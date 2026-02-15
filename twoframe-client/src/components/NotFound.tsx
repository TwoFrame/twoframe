import { useNavigate } from "@tanstack/react-router";
import { Button } from "./ui/button";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">404 - Page not found!</h1>
      <Button onClick={() => navigate({ to: "/" })}>Go to home page</Button>
    </div>
  );
}
