import { ArrowRight, Compass, Globe2, Layers, Moon, Orbit, Scale } from 'lucide-react';
import {
  DEFAULT_WEIGHTS,
  EARTH_ANALOGUES,
  HERO_VISUAL,
  MARS_SITES,
  MOON_SITES,
  computeDemoAnalogueScore,
  type NavSection,
  type WorldType,
} from '../data/analogueData';
import { ResilientImage } from './ResilientImage';

interface HomeViewProps {
  onNavigate: (section: NavSection) => void;
  onStartCompare: (world: WorldType, targetId: string, earthId?: string) => void;
}

export function HomeView({ onNavigate, onStartCompare }: HomeViewProps) {
  const featuredMoon = MOON_SITES[0];
  const featuredMars = MARS_SITES[0];

  const moonRankingPreview = EARTH_ANALOGUES.filter((e) =>
    e.targetWorlds.includes('moon')
  )
    .map((site) => ({
      site,
      score: computeDemoAnalogueScore(
        featuredMoon.demoTargetProfile,
        site.demoProfile,
        DEFAULT_WEIGHTS
      ),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const marsRankingPreview = EARTH_ANALOGUES.filter((e) =>
    e.targetWorlds.includes('mars')
  )
    .map((site) => ({
      site,
      score: computeDemoAnalogueScore(
        featuredMars.demoTargetProfile,
        site.demoProfile,
        DEFAULT_WEIGHTS
      ),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-800/70 bg-gradient-to-b from-[#081024] via-[#060B18] to-[#060B18]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 65% 45% at 20% 10%, rgba(34, 211, 238, 0.11), transparent 70%), radial-gradient(ellipse 55% 45% at 85% 20%, rgba(139, 92, 246, 0.12), transparent 70%)',
          }}
        />

        <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-stretch gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-20">
          {/* Left Column: Core Narrative & Primary Action */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-cyan-300">
              <span>TerraTwin</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300">NASA Space Apps Challenge</span>
            </div>

            <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
              Explore Earth. Understand Other Worlds.
            </h1>

            <p className="mt-4 text-lg font-medium text-cyan-200/95 sm:text-xl">
              Finding Earth&apos;s closest analogues to the Moon and Mars.
            </p>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300">
              Before astronauts build a permanent base on the Moon or land on Mars, scientists train and test hardware right here on Earth. TerraTwin helps researchers and students explore lunar and Martian target regions, discover matching Earth environments, and compare planetary conditions side by side.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('compare')}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 text-sm font-semibold text-[#060B18] transition-colors duration-150 hover:bg-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              >
                <span>Compare Locations</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('moon')}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-700 bg-[#0D1529] px-5 py-3 text-sm font-medium text-slate-200 transition-colors duration-150 hover:border-cyan-500/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
              >
                <span>Start with Moon Explorer</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual */}
          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[280px] overflow-hidden rounded-xl border border-slate-800/90 bg-[#0B1326]">
              <ResilientImage
                src={HERO_VISUAL.imageUrl}
                alt={HERO_VISUAL.imageAlt}
                className="h-full w-full object-cover"
                fallbackLabel="Earth, Moon, and Mars Planetary Analogue Alignment"
                accent="blue"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060B18]/90 via-[#060B18]/20 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="text-xs font-mono uppercase tracking-wider text-cyan-300">
                  Challenge Focus
                </p>
                <p className="mt-1 text-sm font-medium text-slate-100">
                  Identify Earth Locations that Analog the Permanent Moon Base Locations and Mars
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Beginner-Friendly Planetary Explorers */}
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-800/80 pb-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-cyan-400">
              Three Worlds · One Comparison Framework
            </p>
            <h2 className="mt-2 text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl">
              How Planetary Analogue Exploration Works
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-400">
            Select a planetary destination or a terrestrial field site to examine geology, climate extremes, and mission test readiness.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Moon Card */}
          <article className="flex flex-col justify-between rounded-xl border border-slate-800/90 bg-[#0B1326] p-6 transition-colors duration-150 hover:border-cyan-500/40">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-cyan-300">01 · Lunar Target</span>
                <Moon className="h-4 w-4 text-cyan-400" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">Moon Explorer</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                Examine candidate permanent Moon base regions including Shackleton Crater, Malapert Massif, and Marius Hills lava tube skylights.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-2 gap-y-1 text-xs text-slate-400">
                <span>South Pole Ice</span>
                <span aria-hidden="true">·</span>
                <span>Grazing Sunlight</span>
                <span aria-hidden="true">·</span>
                <span>Lava Tubes</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('moon')}
              className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-cyan-300 transition-colors hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-cyan-400"
            >
              <span>Open Moon Explorer</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </article>

          {/* Mars Card */}
          <article className="flex flex-col justify-between rounded-xl border border-slate-800/90 bg-[#0B1326] p-6 transition-colors duration-150 hover:border-purple-500/40">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-purple-300">02 · Martian Target</span>
                <Orbit className="h-4 w-4 text-purple-400" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">Mars Explorer</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                Study major Martian regions such as Jezero Crater, Gale Crater, and Arcadia Planitia across mineralogy, terrain, and subsurface ice.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-2 gap-y-1 text-xs text-slate-400">
                <span>Ancient Deltas</span>
                <span aria-hidden="true">·</span>
                <span>Iron-Rich Clays</span>
                <span aria-hidden="true">·</span>
                <span>Shallow Ice</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('mars')}
              className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-purple-300 transition-colors hover:text-purple-200 focus-visible:outline-2 focus-visible:outline-purple-400"
            >
              <span>Open Mars Explorer</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </article>

          {/* Earth Card */}
          <article className="flex flex-col justify-between rounded-xl border border-slate-800/90 bg-[#0B1326] p-6 transition-colors duration-150 hover:border-blue-500/40">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-blue-300">03 · Earth Field Sites</span>
                <Globe2 className="h-4 w-4 text-blue-400" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">Earth Explorer</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                Browse real terrestrial analogue deserts, Arctic impact craters, and basaltic volcanoes where space agencies test rovers and habitats.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-2 gap-y-1 text-xs text-slate-400">
                <span>Atacama Desert</span>
                <span aria-hidden="true">·</span>
                <span>Devon Island</span>
                <span aria-hidden="true">·</span>
                <span>Mauna Kea</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('earth')}
              className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-blue-300 transition-colors hover:text-blue-200 focus-visible:outline-2 focus-visible:outline-blue-400"
            >
              <span>Open Earth Explorer</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </article>
        </div>
      </section>

      {/* Section 3: Sample Analogue Ranking Snapshot */}
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-slate-800/90 bg-[#0B1326] p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-800/80 pb-6 lg:flex-row lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-300">
                <span>Analogue Comparison Preview</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-amber-300">Sample Demonstration Data</span>
              </div>
              <h2 className="mt-2 text-balance text-2xl font-bold text-white">
                How Earth Locations Rank Against Moon &amp; Mars Targets
              </h2>
              <p className="mt-1.5 max-w-2xl text-sm text-slate-400">
                The rankings below illustrate how TerraTwin scores Earth field sites using default weights across terrain, mineralogy, climate extremes, lighting, and logistics. Adjust weights yourself in Compare Locations.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('compare')}
              className="inline-flex min-h-[44px] w-fit shrink-0 items-center gap-2 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-4 py-2.5 text-sm font-semibold text-cyan-200 transition-colors hover:bg-cyan-500/20 focus-visible:outline-2 focus-visible:outline-cyan-400"
            >
              <Scale className="h-4 w-4" />
              <span>Customize Ranking Weights</span>
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Moon Preview Column */}
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono text-cyan-300">Moon Target Reference</p>
                  <h3 className="mt-0.5 text-lg font-semibold text-white">
                    {featuredMoon.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onStartCompare('moon', featuredMoon.id)}
                  className="text-xs font-medium text-cyan-300 hover:text-cyan-200"
                >
                  Compare All →
                </button>
              </div>

              <div className="mt-4 divide-y divide-slate-800/80 border-y border-slate-800/80">
                {moonRankingPreview.map(({ site, score }, idx) => (
                  <div
                    key={site.id}
                    className="flex items-center justify-between gap-4 py-3.5"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-100">
                        <span className="mr-2 font-mono text-xs text-slate-400 tabular-nums">
                          0{idx + 1}
                        </span>
                        {site.name}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-slate-400">
                        {site.countryOrRegion} · {site.category}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-mono text-base font-semibold text-cyan-300 tabular-nums">
                        {score.toFixed(1)}
                        <span className="ml-1 text-xs font-normal text-slate-400">/ 100</span>
                      </p>
                      <p className="text-[11px] text-slate-500">Demo index</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mars Preview Column */}
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono text-purple-300">Mars Target Reference</p>
                  <h3 className="mt-0.5 text-lg font-semibold text-white">
                    {featuredMars.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onStartCompare('mars', featuredMars.id)}
                  className="text-xs font-medium text-purple-300 hover:text-purple-200"
                >
                  Compare All →
                </button>
              </div>

              <div className="mt-4 divide-y divide-slate-800/80 border-y border-slate-800/80">
                {marsRankingPreview.map(({ site, score }, idx) => (
                  <div
                    key={site.id}
                    className="flex items-center justify-between gap-4 py-3.5"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-100">
                        <span className="mr-2 font-mono text-xs text-slate-400 tabular-nums">
                          0{idx + 1}
                        </span>
                        {site.name}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-slate-400">
                        {site.countryOrRegion} · {site.category}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-mono text-base font-semibold text-purple-300 tabular-nums">
                        {score.toFixed(1)}
                        <span className="ml-1 text-xs font-normal text-slate-400">/ 100</span>
                      </p>
                      <p className="text-[11px] text-slate-500">Demo index</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Project Introduction & Team NUVYRA */}
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 rounded-xl border border-slate-800/90 bg-gradient-to-br from-[#0D1529] via-[#0B1326] to-[#121232] p-6 sm:p-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <p className="text-xs font-mono uppercase tracking-wider text-blue-300">
              About the Project
            </p>
            <h2 className="mt-2 text-balance text-2xl font-bold text-white sm:text-3xl">
              Connecting Earth Science to Lunar &amp; Martian Exploration
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              Built for the NASA Space Apps Challenge, TerraTwin addresses the challenge:{' '}
              <span className="font-medium text-white">
                &ldquo;Identify Earth Locations that Analog the Permanent Moon Base Locations and Mars.&rdquo;
              </span>{' '}
              By organizing real planetary sites alongside well-documented Earth field testbeds—and separating qualitative geology from clearly marked demonstration scoring—TerraTwin makes comparative planetology accessible for students, educators, and mission researchers.
            </p>
            <p className="mt-4 text-sm font-semibold text-cyan-300">
              Developed by Team NUVYRA.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 border-t border-slate-800/80 pt-6 lg:col-span-4 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
            <div className="flex items-start gap-3">
              <Compass className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-semibold text-white">Beginner-Friendly Context</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  Clear explanations of craters, regolith, permafrost, and why Earth field analogues matter.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Layers className="mt-0.5 h-5 w-5 shrink-0 text-purple-400" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-semibold text-white">Honest Demonstration Data</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  No fabricated scientific claims—all illustrative similarity indices are explicitly marked as demonstration data.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('about')}
              className="mt-2 inline-flex min-h-[40px] w-fit items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-cyan-300"
            >
              <span>Read Methodology &amp; Glossary</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
