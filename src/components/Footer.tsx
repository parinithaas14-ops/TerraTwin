import type { NavSection } from '../data/analogueData';

interface FooterProps {
  onNavigate: (section: NavSection) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-slate-800/80 bg-[#050914]">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <div className="flex flex-wrap items-center gap-2.5 text-sm">
            <span className="font-bold text-white">TerraTwin</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300">Developed by Team NUVYRA</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">NASA Space Apps Challenge</span>
          </div>
          <p className="mt-2 max-w-xl text-xs leading-relaxed text-slate-400">
            Finding Earth&apos;s closest analogues to the Moon and Mars. Quantitative comparison scores shown in interactive tools are clearly labeled sample demonstration data.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-400">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="hover:text-cyan-300 transition-colors"
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => onNavigate('moon')}
            className="hover:text-cyan-300 transition-colors"
          >
            Moon Explorer
          </button>
          <button
            type="button"
            onClick={() => onNavigate('mars')}
            className="hover:text-cyan-300 transition-colors"
          >
            Mars Explorer
          </button>
          <button
            type="button"
            onClick={() => onNavigate('earth')}
            className="hover:text-cyan-300 transition-colors"
          >
            Earth Explorer
          </button>
          <button
            type="button"
            onClick={() => onNavigate('compare')}
            className="hover:text-cyan-300 transition-colors"
          >
            Compare Locations
          </button>
          <button
            type="button"
            onClick={() => onNavigate('about')}
            className="hover:text-cyan-300 transition-colors"
          >
            About
          </button>
        </nav>
      </div>
    </footer>
  );
}
