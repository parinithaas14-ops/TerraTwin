import type { NavSection } from '../data/analogueData';

interface AboutViewProps {
  onNavigate: (section: NavSection) => void;
}

const GLOSSARY_TERMS = [
  {
    term: 'Planetary Analogue',
    definition:
      'A location on Earth whose rocks, soil chemistry, topography, or extreme climate resemble conditions on the Moon, Mars, or other planetary bodies.',
  },
  {
    term: 'Regolith',
    definition:
      'The layer of loose, fragmented rock, dust, and mineral grains covering solid bedrock on the Moon, Mars, and Earth.',
  },
  {
    term: 'Permanently Shadowed Region (PSR)',
    definition:
      'Deep crater floors near the lunar poles that never receive direct sunlight, maintaining ultra-cold temperatures capable of preserving water ice.',
  },
  {
    term: 'In-Situ Resource Utilization (ISRU)',
    definition:
      'Harvesting local planetary materials—such as lunar polar water ice or Martian atmospheric carbon dioxide—to produce breathable air, water, and propellant.',
  },
  {
    term: 'Impact Breccia',
    definition:
      'Rock composed of angular mineral and rock fragments cemented together by intense heat and pressure during a meteorite impact.',
  },
  {
    term: 'Lava Tube Skylight',
    definition:
      'A collapsed opening in the roof of a volcanic lava tunnel, studied on the Moon as potential natural shelter from cosmic radiation and micrometeoroids.',
  },
];

export function AboutView({ onNavigate }: AboutViewProps) {
  return (
    <div className="mx-auto max-w-[1040px] space-y-12 px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <section className="border-b border-slate-800/80 pb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-300">
          <span>About TerraTwin</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-400">NASA Space Apps Challenge</span>
        </div>
        <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Identify Earth Locations that Analog the Permanent Moon Base Locations and Mars
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-300">
          TerraTwin is an educational and scientific exploration platform built to help users understand how Earth&apos;s most extreme landscapes serve as proving grounds for lunar base planning and Martian surface missions.
        </p>
        <p className="mt-4 text-sm font-semibold text-cyan-300">
          Developed by Team NUVYRA.
        </p>
      </section>

      {/* Methodology & Data Transparency */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-slate-800/90 bg-[#0B1326] p-6">
          <h2 className="text-lg font-semibold text-white">Challenge Goal</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Sending astronauts and autonomous rovers to the Moon&apos;s south pole or Mars requires validating tools, spacesuits, drills, and habitats under realistic stress. By mapping extraterrestrial targets to terrestrial analogues—like Devon Island, the Atacama Desert, and Mauna Kea—teams can lower mission risk before launch.
          </p>
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-[#0B1326] p-6">
          <h2 className="text-lg font-semibold text-amber-200">
            Scientific Integrity &amp; Demonstration Data
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            TerraTwin avoids fabricated scientific measurements. Real site names, coordinates, and geological context are paired with clearly labeled{' '}
            <span className="font-medium text-amber-300">Sample Demonstration Data</span>{' '}
            for interactive scoring and radar visualization. Full mission siting uses official datasets from NASA Lunar Reconnaissance Orbiter (LRO), Mars Reconnaissance Orbiter (MRO), and USGS astrogeology surveys.
          </p>
        </div>
      </section>

      {/* Beginner-Friendly Glossary */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Beginner-Friendly Planetary Glossary</h2>
            <p className="mt-1 text-sm text-slate-400">
              Essential terms used across the Moon, Mars, and Earth explorer views.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('compare')}
            className="text-sm font-semibold text-cyan-300 hover:text-cyan-200"
          >
            Try Compare Locations →
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {GLOSSARY_TERMS.map((item) => (
            <div
              key={item.term}
              className="rounded-xl border border-slate-800/90 bg-[#0B1326] p-5"
            >
              <h3 className="text-sm font-semibold text-cyan-300">{item.term}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {item.definition}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
