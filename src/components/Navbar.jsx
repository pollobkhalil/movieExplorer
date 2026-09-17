import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Clapperboard, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/movies', label: 'Browse' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-900/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-white"
          onClick={() => setIsMenuOpen(false)}
        >
          <Clapperboard className="h-7 w-7 text-amber-400" aria-hidden="true" />
          <span className="text-xl font-bold tracking-tight">Movie Explorer</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-amber-400' : 'text-slate-300 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/movies"
            className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400"
          >
            Start exploring
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-200 hover:bg-white/10 md:hidden"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-white/10 bg-slate-900 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-base font-medium ${
                    isActive ? 'bg-white/10 text-amber-400' : 'text-slate-200 hover:bg-white/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/movies"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg bg-amber-500 px-4 py-2 text-center text-base font-semibold text-slate-950 hover:bg-amber-400"
            >
              Start exploring
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
