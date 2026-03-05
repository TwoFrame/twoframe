import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="size-full min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 flex items-center justify-center p-8">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-black bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
          404
        </h1>
        <p className="text-2xl font-bold text-gray-700">Page not found</p>
        <p className="text-gray-500">
          The page you're looking for doesn't exist.
        </p>
        <Button
          onClick={() => navigate({ to: "/" })}
          className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-8 py-3 font-semibold rounded-lg shadow-lg transition-all duration-300"
        >
          Go to Home Page
        </Button>
      </div>
    </div>
  );
}
