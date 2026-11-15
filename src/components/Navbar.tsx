import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { NavSection } from '../data/analogueData';

interface NavbarProps {
  activeSection: NavSection;
  onNavigate: (section: NavSection) => void;
}

const NAV_ITEMS: { id: NavSection; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'moon', label: 'Moon Explorer' },
  { id: 'mars', label: 'Mars Explorer' },
  { id: 'earth', label: 'Earth Explorer' },
  { id: 'compare', label: 'Compare Locations' },
  { id: 'about', label: 'About' },
];

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSelect = (section: NavSection) => {
    onNavigate(section);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#060B18]/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleSelect('home')}
          className="whitespace-nowrap shrink-0 text-left text-lg font-bold tracking-tight text-white transition-colors hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
        >
          TerraTwin
        </button>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-6"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`relative whitespace-nowrap shrink-0 py-1.5 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400 ${
                  isActive
                    ? 'text-cyan-300'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[15px] h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleSelect('compare')}
            className="hidden sm:inline-flex items-center justify-center whitespace-nowrap shrink-0 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-[#060B18] transition-colors duration-150 hover:bg-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            Compare Sites
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-[#0D1529] text-slate-200 transition-colors hover:border-slate-700 hover:text-white lg:hidden focus-visible:outline-2 focus-visible:outline-cyan-400"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-slate-800/80 bg-[#080E1E] px-4 py-3 lg:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  className={`flex min-h-[44px] items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-300'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="text-xs font-mono text-cyan-400">Active</span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
