import { useState } from 'react';
import { ArrowRight, MapPin, Scale } from 'lucide-react';
import {
  DEFAULT_WEIGHTS,
  EARTH_ANALOGUES,
  MARS_SITES,
  MOON_SITES,
  computeDemoAnalogueScore,
  type ExtraterrestrialSite,
  type WorldType,
} from '../data/analogueData';
import { ResilientImage } from './ResilientImage';

interface WorldExplorerViewProps {
  world: WorldType;
  onCompareSite: (world: WorldType, targetId: string, earthId?: string) => void;
}

export function WorldExplorerView({ world, onCompareSite }: WorldExplorerViewProps) {
  const sites = world === 'moon' ? MOON_SITES : MARS_SITES;
  const [selectedId, setSelectedId] = useState<string>(sites[0].id);

  // Reset to first site if world switches between moon and mars
  const activeSite: ExtraterrestrialSite =
    sites.find((s) => s.id === selectedId) ?? sites[0];

  const isMoon = world === 'moon';
  const accentText = isMoon ? 'text-cyan-300' : 'text-purple-300';
  const accentBorder = isMoon ? 'border-cyan-500/50' : 'border-purple-500/50';
  const accentBg = isMoon ? 'bg-cyan-500/10' : 'bg-purple-500/10';
  const primaryButtonClass = isMoon
    ? 'bg-cyan-500 text-[#060B18] hover:bg-cyan-400'
    : 'bg-purple-500 text-white hover:bg-purple-400';

  const matchingEarthSites = EARTH_ANALOGUES.filter((e) =>
    activeSite.recommendedEarthIds.includes(e.id)
  );

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="border-b border-slate-800/80 pb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider">
          <span className={accentText}>
            {isMoon ? 'Moon Explorer' : 'Mars Explorer'}
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-400">
            {isMoon ? 'Candidate Permanent Base Regions' : 'Key Planetary Exploration Targets'}
          </span>
        </div>
        <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {isMoon
            ? 'Explore Lunar Permanent Base Regions'
            : 'Explore Martian Landing & Research Regions'}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
          {isMoon
            ? 'Inspect key sites studied for sustained lunar presence—from sunlit south pole crater rims near water-ice cold traps to sheltered volcanic lava tubes.'
            : 'Inspect ancient Martian river deltas, stratified sulfate basins, and ice-rich northern lowlands to see which Earth deserts and polar craters mirror their geology.'}
        </p>
      </div>

      {/* Interactive Split Workspace */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Selector Rail */}
        <div className="space-y-3 lg:col-span-4" role="tablist" aria-label="Planetary target regions">
          {sites.map((site) => {
            const isSelected = site.id === activeSite.id;
            return (
              <button
                key={site.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedId(site.id)}
                className={`w-full rounded-xl border p-4 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                  isSelected
                    ? `${accentBorder} ${accentBg}`
                    : 'border-slate-800/90 bg-[#0B1326] hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-base font-semibold text-white">{site.name}</span>
                  <span className="font-mono text-[11px] text-slate-400 tabular-nums">
                    {site.coordinates}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-400">{site.region}</p>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-300">
                  {site.primaryFeature}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right Detail Stage */}
        <div className="space-y-8 lg:col-span-8">
          <div className="overflow-hidden rounded-xl border border-slate-800/90 bg-[#0B1326]">
            <div className="relative aspect-[16/9] max-h-[340px] w-full overflow-hidden bg-[#080E1E]">
              <ResilientImage
                src={activeSite.imageUrl}
                alt={activeSite.imageAlt}
                className="h-full w-full object-cover"
                fallbackLabel={`${activeSite.name} · ${activeSite.region}`}
                accent={isMoon ? 'cyan' : 'purple'}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1326] via-[#0B1326]/25 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-300">
                  <span>{activeSite.region}</span>
                  <span aria-hidden="true" className="text-slate-500">·</span>
                  <span className="tabular-nums">{activeSite.coordinates}</span>
                </div>
                <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                  {activeSite.name}
                </h2>
              </div>
            </div>

            <div className="space-y-6 p-6">
              <div className="flex flex-col justify-between gap-4 border-b border-slate-800/80 pb-6 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Primary Feature
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-100">
                    {activeSite.primaryFeature}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onCompareSite(world, activeSite.id)}
                  className={`inline-flex min-h-[42px] shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${primaryButtonClass}`}
                >
                  <Scale className="h-4 w-4" />
                  <span>Compare with Earth Sites</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold text-white">Mission Context</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {activeSite.missionContext}
                  </p>
                  <h3 className="mt-5 text-sm font-semibold text-white">Why Researchers Study It</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {activeSite.scientificInterest}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white">Key Environmental Conditions</h3>
                  <ul className="mt-2 space-y-2.5 text-sm leading-relaxed text-slate-300">
                    {activeSite.keyConditions.map((condition) => (
                      <li key={condition} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                            isMoon ? 'bg-cyan-400' : 'bg-purple-400'
                          }`}
                        />
                        <span>{condition}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Matching Earth Analogues */}
          <div className="rounded-xl border border-slate-800/90 bg-[#0B1326] p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Recommended Earth Analogue Sites
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Illustrative ranking index labeled as Sample Demonstration Data.
                </p>
              </div>
              <span className="font-mono text-xs text-amber-300">
                Sample Demonstration Data
              </span>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              {matchingEarthSites.map((earthSite) => {
                const score = computeDemoAnalogueScore(
                  activeSite.demoTargetProfile,
                  earthSite.demoProfile,
                  DEFAULT_WEIGHTS
                );
                return (
                  <div
                    key={earthSite.id}
                    className="flex flex-col justify-between rounded-lg border border-slate-800 bg-[#080E1E] p-4"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-sm font-semibold text-white">
                            {earthSite.name}
                          </h4>
                          <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                            <span>{earthSite.countryOrRegion}</span>
                          </p>
                        </div>
                        <span className={`font-mono text-sm font-semibold tabular-nums ${accentText}`}>
                          {score.toFixed(1)}
                        </span>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-slate-300">
                        {earthSite.geologicalMatch}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onCompareSite(world, activeSite.id, earthSite.id)}
                      className="mt-4 inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:text-cyan-200"
                    >
                      <span>Inspect Side-by-Side</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
