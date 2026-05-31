import { Download, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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

/**
 * PWA install prompt banner.
 * Shows a download button for Chrome/Android and manual steps for iOS.
 * Hidden when already in standalone (installed) mode.
 */
export function InstallBanner({
  status,
  install,
  showIOSGuide,
}: InstallBannerProps) {
  if (status === "standalone" || status === "idle") return null;

  const isInstalled = status === "installed";
  const isInstalling = status === "installing";

  return (
    <div className="flex flex-col gap-2 animate-slide-up">
      {/* Main banner card */}
      <div
        className={cn(
          "flex items-center gap-3 rounded-2xl border border-border",
          "bg-card p-4 shadow-sm"
        )}
      >
        {/* Icon */}
        <div
          className="flex items-center justify-center size-10 rounded-xl shrink-0"
          style={{
            background: "oklch(0.55 0.25 258 / 0.1)",
            color: "oklch(0.55 0.25 258)",
          }}
        >
          {isInstalled ? (
            <CheckCircle className="size-5" />
          ) : (
            <Download className="size-5" />
          )}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">
            {isInstalled ? "App Installed!" : "Add to Home Screen"}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {isInstalled
              ? "Delhi Metro Navigator is ready to use offline."
              : "Works offline · No app store needed"}
          </p>
        </div>

        {/* Button */}
        {!isInstalled && (
          <Button
            id="install-btn"
            size="sm"
            onClick={install}
            disabled={isInstalling}
            className="shrink-0 rounded-xl"
          >
            {isInstalling ? (
              <Loader2 data-icon="inline-start" className="animate-spin" />
            ) : (
              <Download data-icon="inline-start" />
            )}
            {isInstalling ? "Installing…" : "Install"}
          </Button>
        )}
      </div>

      {/* iOS manual steps */}
      {showIOSGuide && (
        <div
          className={cn(
            "rounded-2xl border border-border bg-secondary/30 p-4",
            "animate-slide-up"
          )}
        >
          <p className="text-xs font-semibold text-foreground mb-3">
            📱 How to install on your device
          </p>
          <ol className="flex flex-col gap-2">
            {IOS_STEPS.map((step) => (
              <li key={step.num} className="flex items-start gap-2.5">
                <span
                  className="flex items-center justify-center size-5 rounded-full text-[10px] font-bold shrink-0 mt-0.5"
                  style={{
                    background: "oklch(0.55 0.25 258 / 0.15)",
                    color: "oklch(0.55 0.25 258)",
                  }}
                >
                  {step.num}
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
