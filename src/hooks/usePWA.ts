import { useState, useEffect, useCallback } from "react";

type InstallStatus = "idle" | "available" | "installing" | "installed" | "standalone";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export interface UsePWAReturn {
  status: InstallStatus;
  install: () => void;
  showIOSGuide: boolean;
  toggleIOSGuide: () => void;
}

/**
 * Manages PWA install prompt state and lifecycle.
 * Handles both Chrome/Android (beforeinstallprompt) and iOS (manual guide).
 */
export function usePWA(): UsePWAReturn {
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as { standalone?: boolean }).standalone === true;

  const [status, setStatus] = useState<InstallStatus>(
    isStandalone ? "standalone" : "idle"
  );
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    if (isStandalone) return;

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setStatus("available");
    };

    const handleInstalled = () => {
      setDeferredPrompt(null);
      setStatus("installed");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, [isStandalone]);

  const install = useCallback(async () => {
    if (status === "standalone" || status === "installed") return;

    if (deferredPrompt) {
      setStatus("installing");
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setStatus("installed");
      } else {
        setStatus("available");
      }
      setDeferredPrompt(null);
      return;
    }

    // iOS fallback — show manual guide
    setShowIOSGuide((v) => !v);
  }, [deferredPrompt, status]);

  const toggleIOSGuide = useCallback(() => {
    setShowIOSGuide((v) => !v);
  }, []);

  return { status, install, showIOSGuide, toggleIOSGuide };
}
