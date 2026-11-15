import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import {
  DEFAULT_WEIGHTS,
  EARTH_ANALOGUES,
  FACTOR_LABELS,
  MARS_SITES,
  MOON_SITES,
  computeDemoAnalogueScore,
  type ComparisonWeights,
  type WorldType,
} from '../data/analogueData';
import { RadarChart } from './RadarChart';

interface CompareViewProps {
  initialWorld: WorldType;
  initialTargetId: string;
  initialEarthId: string;
}

export function CompareView({
  initialWorld,
  initialTargetId,
  initialEarthId,
}: CompareViewProps) {
  const [world, setWorld] = useState<WorldType>(initialWorld);
  const targetList = world === 'moon' ? MOON_SITES : MARS_SITES;

  const [targetId, setTargetId] = useState<string>(initialTargetId);
  const [earthId, setEarthId] = useState<string>(initialEarthId);
  const [weights, setWeights] = useState<ComparisonWeights>(DEFAULT_WEIGHTS);
  const [showOnlyRecommendedWorld, setShowOnlyRecommendedWorld] = useState<boolean>(false);

  const activeTarget = targetList.find((s) => s.id === targetId) ?? targetList[0];

  const candidatePool = showOnlyRecommendedWorld
    ? EARTH_ANALOGUES.filter((e) => e.targetWorlds.includes(world))
    : EARTH_ANALOGUES;

  const rankedEarthSites = candidatePool
    .map((earthSite) => ({
      earthSite,
      score: computeDemoAnalogueScore(
        activeTarget.demoTargetProfile,
        earthSite.demoProfile,
        weights
      ),
    }))
    .sort((a, b) => b.score - a.score);

  const activeEarth =
    EARTH_ANALOGUES.find((e) => e.id === earthId) ??
    rankedEarthSites[0]?.earthSite ??
    EARTH_ANALOGUES[0];

  const activeScore = computeDemoAnalogueScore(
    activeTarget.demoTargetProfile,
    activeEarth.demoProfile,
    weights
  );

  const handleWorldSwitch = (nextWorld: WorldType) => {
    setWorld(nextWorld);
    const nextList = nextWorld === 'moon' ? MOON_SITES : MARS_SITES;
    setTargetId(nextList[0].id);
  };

  const handleWeightChange = (key: keyof ComparisonWeights, value: number) => {
    setWeights((prev) => ({ ...prev, [key]: value }));
  };

  const resetWeights = () => setWeights(DEFAULT_WEIGHTS);

  const totalWeight = (Object.values(weights) as number[]).reduce((a, b) => a + b, 0);

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
      {/* Header + Explicit Demonstration Data Label */}
      <div className="border-b border-slate-800/80 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider">
              <span className="text-cyan-300">Compare Locations</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-amber-300">Sample Demonstration Data</span>
            </div>
            <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Analogue Comparison &amp; Ranking Workbench
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
              Select a Moon or Mars destination, adjust priority weights for scientific factors, and compare Earth analogue candidates side by side.
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-xs leading-relaxed text-amber-100/90">
          <span className="font-semibold text-amber-300">Demonstration Notice:</span>{' '}
          Site descriptions and coordinates reflect real planetary and terrestrial field locations, while the 0–100 numerical profile metrics and weighted analogue rankings below are{' '}
          <span className="underline decoration-amber-400/60 underline-offset-2">
            sample demonstration data
          </span>{' '}
          created to illustrate TerraTwin&apos;s interactive comparison model.
        </div>
      </div>

      {/* Target & Analogue Selectors */}
      <div className="mt-8 grid grid-cols-1 gap-6 rounded-xl border border-slate-800/90 bg-[#0B1326] p-5 lg:grid-cols-12">
        {/* World Toggle */}
        <div className="lg:col-span-3">
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400">
            1. Target World
          </label>
          <div className="mt-2 grid grid-cols-2 gap-1 rounded-lg border border-slate-800 bg-[#080E1E] p-1">
            <button
              type="button"
              onClick={() => handleWorldSwitch('moon')}
              className={`rounded-md py-2 text-xs font-semibold transition-colors ${
                world === 'moon'
                  ? 'bg-cyan-500 text-[#060B18]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Moon
            </button>
            <button
              type="button"
              onClick={() => handleWorldSwitch('mars')}
              className={`rounded-md py-2 text-xs font-semibold transition-colors ${
                world === 'mars'
                  ? 'bg-purple-500 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Mars
            </button>
          </div>
        </div>

        {/* Target Site Select */}
        <div className="lg:col-span-4">
          <label
            htmlFor="target-site-select"
            className="block text-xs font-mono uppercase tracking-wider text-slate-400"
          >
            2. {world === 'moon' ? 'Moon Base Site' : 'Mars Region'}
          </label>
          <select
            id="target-site-select"
            value={activeTarget.id}
            onChange={(e) => setTargetId(e.target.value)}
            className="mt-2 min-h-[42px] w-full rounded-lg border border-slate-700 bg-[#080E1E] px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
          >
            {targetList.map((site) => (
              <option key={site.id} value={site.id}>
                {site.name} ({site.region})
              </option>
            ))}
          </select>
        </div>

        {/* Earth Analogue Select */}
        <div className="lg:col-span-5">
          <label
            htmlFor="earth-site-select"
            className="block text-xs font-mono uppercase tracking-wider text-slate-400"
          >
            3. Earth Analogue Site
          </label>
          <select
            id="earth-site-select"
            value={activeEarth.id}
            onChange={(e) => setEarthId(e.target.value)}
            className="mt-2 min-h-[42px] w-full rounded-lg border border-slate-700 bg-[#080E1E] px-3 py-2 text-sm text-white focus:border-purple-400 focus:outline-none"
          >
            {EARTH_ANALOGUES.map((site) => (
              <option key={site.id} value={site.id}>
                {site.name} — {site.countryOrRegion}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Comparison Workspace */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left: Weight Sliders */}
        <aside className="rounded-xl border border-slate-800/90 bg-[#0B1326] p-6 lg:col-span-4">
          <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
            <div>
              <h2 className="text-base font-semibold text-white">Priority Weights</h2>
              <p className="mt-0.5 text-xs text-slate-400">
                Adjust emphasis to recalculate Earth rankings
              </p>
            </div>
            <button
              type="button"
              onClick={resetWeights}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 px-2.5 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="mt-5 space-y-5">
            {(Object.keys(FACTOR_LABELS) as (keyof ComparisonWeights)[]).map((key) => {
              const info = FACTOR_LABELS[key];
              const pct =
                totalWeight > 0 ? Math.round((weights[key] / totalWeight) * 100) : 0;
              return (
                <div key={key}>
                  <div className="flex items-center justify-between text-xs">
                    <label htmlFor={`weight-${key}`} className="font-medium text-slate-200">
                      {info.label}
                    </label>
                    <span className="font-mono text-cyan-300 tabular-nums">{pct}%</span>
                  </div>
                  <input
                    id={`weight-${key}`}
                    type="range"
                    min={0}
                    max={50}
                    step={5}
                    value={weights[key]}
                    onChange={(e) => handleWeightChange(key, Number(e.target.value))}
                    className="terra-slider mt-2 w-full"
                  />
                  <p className="mt-1 text-[11px] leading-snug text-slate-400">
                    {info.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 border-t border-slate-800/80 pt-4">
            <label className="flex cursor-pointer items-center gap-2.5 text-xs text-slate-300">
              <input
                type="checkbox"
                checked={showOnlyRecommendedWorld}
                onChange={(e) => setShowOnlyRecommendedWorld(e.target.checked)}
                className="h-4 w-4 rounded border-slate-700 bg-[#080E1E] accent-cyan-500"
              />
              <span>
                Filter leaderboard to {world === 'moon' ? 'Moon' : 'Mars'}-tagged Earth sites
              </span>
            </label>
          </div>
        </aside>

        {/* Right: Radar Chart + Side-by-Side Comparison */}
        <div className="space-y-8 lg:col-span-8">
          {/* Top Visual Comparison Card */}
          <div className="grid grid-cols-1 gap-6 rounded-xl border border-slate-800/90 bg-[#0B1326] p-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-6">
              <RadarChart
                targetLabel={activeTarget.name}
                targetProfile={activeTarget.demoTargetProfile}
                earthLabel={activeEarth.name}
                earthProfile={activeEarth.demoProfile}
              />
            </div>

            <div className="space-y-5 md:col-span-6">
              <div className="border-b border-slate-800/80 pb-4">
                <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Illustrative Match Index (Demo Data)
                </p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-mono text-4xl font-bold text-cyan-300 tabular-nums">
                    {activeScore.toFixed(1)}
                  </span>
                  <span className="font-mono text-sm text-slate-400">/ 100</span>
                </div>
                <p className="mt-2 text-xs text-slate-300">
                  Comparing <span className="font-semibold text-white">{activeTarget.name}</span> with{' '}
                  <span className="font-semibold text-white">{activeEarth.name}</span>
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <p className="font-mono text-cyan-300">
                    {world === 'moon' ? 'Moon' : 'Mars'} Characteristic
                  </p>
                  <p className="mt-0.5 leading-relaxed text-slate-300">
                    {activeTarget.primaryFeature}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-purple-300">Earth Analogue Match</p>
                  <p className="mt-0.5 leading-relaxed text-slate-300">
                    {activeEarth.geologicalMatch}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-blue-300">Real Field Use</p>
                  <p className="mt-0.5 leading-relaxed text-slate-300">
                    {activeEarth.fieldResearchUse}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Ranked Earth Analogues Table */}
          <div className="overflow-hidden rounded-xl border border-slate-800/90 bg-[#0B1326]">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 px-6 py-4">
              <div>
                <h2 className="text-base font-semibold text-white">
                  Ranked Earth Analogue Locations for {activeTarget.name}
                </h2>
                <p className="mt-0.5 text-xs text-slate-400">
                  Click any row to inspect it on the radar chart above · Sample Demonstration Data
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-800/80 bg-[#080E1E] text-xs font-mono uppercase tracking-wider text-slate-400">
                    <th className="px-5 py-3">Rank</th>
                    <th className="px-5 py-3">Earth Location</th>
                    <th className="px-5 py-3">Terrain</th>
                    <th className="px-5 py-3 text-right">Demo Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  {rankedEarthSites.map(({ earthSite, score }, index) => {
                    const isSelected = earthSite.id === activeEarth.id;
                    return (
                      <tr
                        key={earthSite.id}
                        onClick={() => setEarthId(earthSite.id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-cyan-500/10'
                            : 'hover:bg-slate-800/40'
                        }`}
                      >
                        <td className="px-5 py-3.5 font-mono text-xs text-slate-400 tabular-nums">
                          0{index + 1}
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="font-medium text-white">{earthSite.name}</div>
                          <div className="text-xs text-slate-400">
                            {earthSite.countryOrRegion} · {earthSite.coordinates}
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-xs text-slate-300">
                          {earthSite.category}
                        </td>
                        <td className="px-5 py-3.5 text-right font-mono font-semibold text-cyan-300 tabular-nums">
                          {score.toFixed(1)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
