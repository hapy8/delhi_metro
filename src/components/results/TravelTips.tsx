import { Lightbulb } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const TIPS = [
  "Allow 5–8 extra minutes at interchange stations.",
  "Peak hours: 8–10 AM and 5–8 PM may have longer waits.",
  "Token & Smart Card valid on all DMRC lines.",
  "Board the correct direction — check the terminus sign on the platform.",
] as const;

export function TravelTips() {
  return (
    <Alert>
      <Lightbulb className="size-4 text-orange-500" />
      <AlertTitle>Travel Tips</AlertTitle>
      <AlertDescription className="mt-2">
        <ul className="list-disc pl-4 space-y-1">
          {TIPS.map((tip, i) => (
            <li key={i} className="text-muted-foreground">{tip}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}
