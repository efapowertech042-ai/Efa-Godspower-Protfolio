import { useState } from 'react';
import { Search, X, Menu } from 'lucide-react';
import { RoutePath } from '../data/portfolioData';

interface NavbarProps {
  currentRoute: RoutePath;
  onNavigate: (route: RoutePath) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const NAV_ITEMS: { label: string; route: RoutePath }[] = [
  { label: 'Home', route: '/home' },
  { label: 'Portfolio', route: '/portfolio' },
  { label: 'Resume', route: '/resume' },
  { label: 'Contact', route: '/contact' },
];

export function Navbar({
  currentRoute,
  onNavigate,
  searchQuery,
  onSearchChange,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (route: RoutePath) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  const handleSearchInput = (val: string) => {
    onSearchChange(val);
    if (val.trim().length > 0 && currentRoute !== '/portfolio') {
      onNavigate('/portfolio');
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#06080D]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:gap-8 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="/home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('/home');
          }}
          className="font-display text-lg font-semibold tracking-tight text-white whitespace-nowrap shrink-0 transition-colors hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded"
        >
          Efa Godspower
        </a>

        {/* Zone 2: Primary 4-Tab Navigation */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <a
                key={item.route}
                href={item.route}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.route);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded ${
                  isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute inset-x-0 -bottom-[15px] h-[2px] bg-gradient-to-r from-amber-400 to-orange-500"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Real-time Project Search Bar & Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative hidden sm:block w-56 lg:w-72">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => handleSearchInput(e.target.value)}
              placeholder="Filter projects, stack, domain..."
              aria-label="Filter portfolio projects by title, tech stack, or domain"
              className="w-full rounded-lg border border-white/[0.1] bg-[#0B0F17]/90 py-2 pl-9 pr-8 text-xs text-slate-100 placeholder:text-slate-400 transition-colors focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-orange-400/50"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear project search"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-slate-400 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.1] bg-[#0B0F17]/90 text-slate-200 hover:bg-white/[0.08] md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-white/[0.08] bg-[#06080D]/95 px-4 py-4 backdrop-blur-xl md:hidden">
          <div className="relative mb-3 sm:hidden">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => handleSearchInput(e.target.value)}
              placeholder="Filter projects, stack, domain..."
              aria-label="Filter portfolio projects"
              className="w-full rounded-lg border border-white/[0.1] bg-[#0B0F17]/90 py-2.5 pl-9 pr-8 text-sm text-slate-100 placeholder:text-slate-400 focus:border-amber-400 focus:outline-none"
            />
          </div>
          <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <a
                  key={item.route}
                  href={item.route}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.route);
                  }}
                  className={`flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-white'
                      : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
