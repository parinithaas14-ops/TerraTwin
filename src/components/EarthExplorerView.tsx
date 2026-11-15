import { useState } from 'react';
import { ArrowRight, MapPin, Mountain } from 'lucide-react';
import {
  EARTH_ANALOGUES,
  MARS_SITES,
  MOON_SITES,
  type EarthAnalogueSite,
  type EarthTerrainCategory,
  type WorldType,
} from '../data/analogueData';
import { ResilientImage } from './ResilientImage';

interface EarthExplorerViewProps {
  onCompareWithEarth: (world: WorldType, targetId: string, earthId: string) => void;
}

export function EarthExplorerView({ onCompareWithEarth }: EarthExplorerViewProps) {
  const [worldFilter, setWorldFilter] = useState<'all' | WorldType>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | EarthTerrainCategory>('all');
  const [selectedId, setSelectedId] = useState<string>(EARTH_ANALOGUES[0].id);

  const filteredSites = EARTH_ANALOGUES.filter((site) => {
    const matchesWorld =
      worldFilter === 'all' || site.targetWorlds.includes(worldFilter);
    const matchesCategory =
      categoryFilter === 'all' || site.category === categoryFilter;
    return matchesWorld && matchesCategory;
  });

  const activeSite: EarthAnalogueSite =
    filteredSites.find((s) => s.id === selectedId) ??
    filteredSites[0] ??
    EARTH_ANALOGUES[0];

  const defaultTargetWorld: WorldType = activeSite.targetWorlds.includes('moon')
    ? 'moon'
    : 'mars';
  const defaultTargetId =
    defaultTargetWorld === 'moon' ? MOON_SITES[0].id : MARS_SITES[0].id;

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-300">
          <span>Earth Explorer</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-400">Terrestrial Analogue Field Locations</span>
        </div>
        <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Discover Earth&apos;s Planetary Testbeds
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
          Extreme deserts, polar impact craters, and basaltic volcanoes on Earth share physical, mineralogical, or thermal traits with the Moon and Mars. Filter locations below to see how scientists use them.
        </p>

        {/* Filter Controls */}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <div
            className="inline-flex items-center gap-1 rounded-lg border border-slate-800 bg-[#0B1326] p-1"
            role="group"
            aria-label="Filter by planetary target"
          >
            {(
              [
                { id: 'all', label: 'All Analogues' },
                { id: 'moon', label: 'Moon Analogues' },
                { id: 'mars', label: 'Mars Analogues' },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setWorldFilter(item.id)}
                className={`whitespace-nowrap shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  worldFilter === item.id
                    ? 'bg-cyan-500 text-[#060B18] font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div
            className="inline-flex flex-wrap items-center gap-1 rounded-lg border border-slate-800 bg-[#0B1326] p-1"
            role="group"
            aria-label="Filter by terrain category"
          >
            {(
              [
                'all',
                'Polar & Impact',
                'Hyper-Arid Desert',
                'Volcanic & Basalt',
              ] as const
            ).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`whitespace-nowrap shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  categoryFilter === cat
                    ? 'bg-blue-500/20 text-blue-200 border border-blue-500/40'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Terrains' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Grid */}
      {filteredSites.length === 0 ? (
        <div className="mt-10 rounded-xl border border-slate-800 bg-[#0B1326] p-10 text-center">
          <p className="text-base font-medium text-white">
            No Earth locations match that combination of filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setWorldFilter('all');
              setCategoryFilter('all');
            }}
            className="mt-4 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-[#060B18] hover:bg-cyan-400"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Site List */}
          <div className="space-y-3 lg:col-span-5">
            {filteredSites.map((site) => {
              const isSelected = site.id === activeSite.id;
              return (
                <button
                  key={site.id}
                  type="button"
                  onClick={() => setSelectedId(site.id)}
                  className={`w-full rounded-xl border p-4 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                    isSelected
                      ? 'border-blue-500/60 bg-blue-500/10'
                      : 'border-slate-800/90 bg-[#0B1326] hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-base font-semibold text-white">{site.name}</h2>
                    <span className="shrink-0 font-mono text-[11px] text-cyan-300">
                      {site.targetWorlds.map((w) => w.toUpperCase()).join(' / ')}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span>{site.countryOrRegion}</span>
                    <span aria-hidden="true">·</span>
                    <span>{site.category}</span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-300">
                    {site.summary}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Detail Dossier */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-xl border border-slate-800/90 bg-[#0B1326]">
              <div className="relative aspect-[16/9] max-h-[320px] w-full overflow-hidden bg-[#080E1E]">
                <ResilientImage
                  src={activeSite.imageUrl}
                  alt={activeSite.imageAlt}
                  className="h-full w-full object-cover"
                  fallbackLabel={`${activeSite.name} · ${activeSite.countryOrRegion}`}
                  accent="blue"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1326] via-[#0B1326]/20 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-300">
                    <span>{activeSite.category}</span>
                    <span aria-hidden="true" className="text-slate-500">·</span>
                    <span className="tabular-nums">{activeSite.coordinates}</span>
                  </div>
                  <h2 className="mt-1 text-2xl font-bold text-white">{activeSite.name}</h2>
                </div>
              </div>

              <div className="space-y-6 p-6">
                <div className="grid grid-cols-1 gap-4 border-b border-slate-800/80 pb-5 sm:grid-cols-2">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />
                    <div>
                      <p className="text-xs text-slate-400">Location</p>
                      <p className="text-sm font-medium text-slate-100">
                        {activeSite.countryOrRegion}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Mountain className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" aria-hidden="true" />
                    <div>
                      <p className="text-xs text-slate-400">Elevation</p>
                      <p className="font-mono text-sm font-medium text-slate-100 tabular-nums">
                        {activeSite.elevation}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white">Geological Analogue Match</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                    {activeSite.geologicalMatch}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white">Space Agency &amp; Field Research Use</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                    {activeSite.fieldResearchUse}
                  </p>
                </div>

                <div className="rounded-lg border border-slate-800 bg-[#080E1E] p-4">
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Environmental Profile
                  </p>
                  <p className="mt-1 text-sm text-slate-200">{activeSite.climateNotes}</p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="text-xs text-slate-400">
                    Relevant Targets:{' '}
                    <span className="font-medium text-slate-200">
                      {activeSite.targetWorlds.map((w) => (w === 'moon' ? 'Moon' : 'Mars')).join(' & ')}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      onCompareWithEarth(defaultTargetWorld, defaultTargetId, activeSite.id)
                    }
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-[#060B18] transition-colors hover:bg-cyan-400"
                  >
                    <span>Compare in Workbench</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
