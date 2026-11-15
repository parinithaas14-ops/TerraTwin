import { useState } from 'react';
import {
  EARTH_ANALOGUES,
  MARS_SITES,
  MOON_SITES,
  type NavSection,
  type WorldType,
} from './data/analogueData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { WorldExplorerView } from './components/WorldExplorerView';
import { EarthExplorerView } from './components/EarthExplorerView';
import { CompareView } from './components/CompareView';
import { AboutView } from './components/AboutView';

interface CompareSelection {
  world: WorldType;
  targetId: string;
  earthId: string;
}

export default function App() {
  const [activeSection, setActiveSection] = useState<NavSection>('home');
  const [compareSelection, setCompareSelection] = useState<CompareSelection>({
    world: 'moon',
    targetId: MOON_SITES[0].id,
    earthId: EARTH_ANALOGUES[0].id,
  });

  const handleNavigate = (section: NavSection) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartCompare = (
    world: WorldType,
    targetId: string,
    earthId?: string
  ) => {
    const fallbackTarget =
      world === 'moon' ? MOON_SITES[0].id : MARS_SITES[0].id;
    const fallbackEarth =
      world === 'moon' ? EARTH_ANALOGUES[0].id : EARTH_ANALOGUES[1].id;

    setCompareSelection({
      world,
      targetId: targetId || fallbackTarget,
      earthId: earthId || fallbackEarth,
    });
    setActiveSection('compare');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#060B18] text-slate-100">
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      <main className="flex-1">
        {activeSection === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onStartCompare={handleStartCompare}
          />
        )}

        {activeSection === 'moon' && (
          <WorldExplorerView
            key="moon"
            world="moon"
            onCompareSite={handleStartCompare}
          />
        )}

        {activeSection === 'mars' && (
          <WorldExplorerView
            key="mars"
            world="mars"
            onCompareSite={handleStartCompare}
          />
        )}

        {activeSection === 'earth' && (
          <EarthExplorerView onCompareWithEarth={handleStartCompare} />
        )}

        {activeSection === 'compare' && (
          <CompareView
            key={`${compareSelection.world}-${compareSelection.targetId}-${compareSelection.earthId}`}
            initialWorld={compareSelection.world}
            initialTargetId={compareSelection.targetId}
            initialEarthId={compareSelection.earthId}
          />
        )}

        {activeSection === 'about' && <AboutView onNavigate={handleNavigate} />}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
