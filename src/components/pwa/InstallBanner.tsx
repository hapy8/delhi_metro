import { Download, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import type { UsePWAReturn } from "@/hooks/usePWA";

interface InstallBannerProps extends UsePWAReturn {}

const IOS_STEPS = [
  {
    num: "1",
    text: "Android / Chrome: Tap the install icon in the URL bar or browser menu.",
  },
  {
    num: "2",
    text: "iOS / Safari: Tap the Share ↑ button, then select Add to Home Screen.",
  },
  {
    num: "3",
    text: "Once added, the app works 100% offline — no internet needed!",
  },
] as const;

export function InstallBanner({
  status,
  install,
  showIOSGuide,
}: InstallBannerProps) {
  if (status === "standalone" || status === "idle") return null;

  const isInstalled = status === "installed";
  const isInstalling = status === "installing";

  return (
    <div className="flex flex-col gap-4 mt-4">
      <Card>
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
            {isInstalled ? <CheckCircle className="size-5" /> : <Download className="size-5" />}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold leading-none tracking-tight">
              {isInstalled ? "App Installed!" : "Add to Home Screen"}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {isInstalled
                ? "Delhi Metro Navigator is ready to use offline."
                : "Works offline · No app store needed"}
            </p>
          </div>
          {!isInstalled && (
            <Button size="sm" onClick={install} disabled={isInstalling} className="shrink-0">
              {isInstalling ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Download className="mr-2 size-4" />}
              {isInstalling ? "Installing..." : "Install"}
            </Button>
          )}
        </CardContent>
      </Card>

      {showIOSGuide && (
        <Alert>
          <AlertTitle className="text-sm font-semibold">📱 How to install</AlertTitle>
          <AlertDescription className="mt-2 text-sm">
            <ol className="flex flex-col gap-2">
              {IOS_STEPS.map((step) => (
                <li key={step.num} className="flex gap-2 text-muted-foreground">
                  <span className="font-bold text-foreground">{step.num}.</span> {step.text}
                </li>
              ))}
            </ol>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
