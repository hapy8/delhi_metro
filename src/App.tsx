import { AppHeader } from "@/components/layout/AppHeader";
import { SearchCard } from "@/components/search/SearchCard";
import { ResultsPanel } from "@/components/results/ResultsPanel";
import { EmptyState } from "@/components/empty/EmptyState";
import { InstallBanner } from "@/components/pwa/InstallBanner";
import { useRouteSearch } from "@/hooks/useRouteSearch";
import { useOffline } from "@/hooks/useOffline";
import { usePWA } from "@/hooks/usePWA";


/**
 * Root application component.
 * Wires hooks → components. Keeps UI declarative and logic encapsulated.
 */
export function App() {
  const isOffline = useOffline();
  const pwa = usePWA();
  const search = useRouteSearch();

  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden bg-background">
      {/* ── Header ── */}
      <AppHeader isOffline={isOffline} />

      {/* ── Main content ── */}
      <main className="flex-1 overflow-y-auto overscroll-y-none">
        <div className="w-full max-w-lg mx-auto px-4 pb-12 pt-4 flex flex-col gap-6">
        {/* Search Form */}
        <SearchCard
          fromStation={search.fromStation}
          toStation={search.toStation}
          onFromChange={search.setFromStation}
          onToChange={search.setToStation}
          onSearch={search.search}
          onSwap={search.swap}
          preference={search.activeKey}
          onPreferenceChange={search.setActiveKey}
          error={search.error}
          onClearError={search.clearError}
        />

        {/* Results — conditional rendering */}
        {search.routes ? (
          <ResultsPanel
            routes={search.routes}
            activeKey={search.activeKey}
            onTabChange={search.setActiveKey}
          />
        ) : !search.isSearched ? (
          <EmptyState />
        ) : null}

        {/* PWA Install Banner */}
        <InstallBanner {...pwa} />
        </div>
      </main>
    </div>
  );
}
