import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  attendeeCode: string;
  adminCode: string;
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={handleCopy}
      className="shrink-0 hover:bg-green-100"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-600" />
      ) : (
        <Copy className="w-4 h-4 text-green-600" />
      )}
    </Button>
  );
}

export function TournamentCodes({ attendeeCode, adminCode }: Props) {
  const adminUrl = `${window.location.origin}/admin/${adminCode}`;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-white border border-green-200 rounded-xl p-6 shadow-lg">
        <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">
          Attendee Join Code
        </h3>
        <div className="flex items-center gap-2">
          <code className="text-2xl font-bold text-green-600 font-mono tracking-widest">
            {attendeeCode}
          </code>
          <CopyButton text={attendeeCode} />
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Share this code with participants
        </p>
      </div>

      <div className="bg-white border border-green-200 rounded-xl p-6 shadow-lg">
        <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">
          Save this Admin URL!
        </h3>
        <div className="flex items-center gap-2">
          <code className="text-sm text-gray-700 font-mono break-all flex-1">
            {adminUrl}
          </code>
          <CopyButton text={adminUrl} />
        </div>
        <p className="text-xs text-red-400 mt-2 font-medium">
          ⚠ You'll need this URL to manage your tournament
        </p>
      </div>
    </div>
  );
}
