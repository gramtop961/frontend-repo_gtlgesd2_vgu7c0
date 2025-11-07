import { useEffect, useState } from 'react';
import { Shield, Bell, Sun, Moon, LogOut } from 'lucide-react';

export default function Navbar({ isAuthed, onLogout, onShowLogin }) {
  const [dark, setDark] = useState(true);
  const [livePulse, setLivePulse] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [dark]);

  useEffect(() => {
    const id = setInterval(() => setLivePulse((p) => !p), 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-900/60 bg-white/80 dark:bg-neutral-900/80 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-500">
            <Shield size={20} />
          </div>
          <div>
            <div className="font-semibold text-neutral-900 dark:text-white tracking-tight">ScaleShield</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">Real-time Security Ops</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800">
            <span className={`inline-flex h-2 w-2 rounded-full ${livePulse ? 'bg-emerald-400 shadow-[0_0_0_6px_rgba(16,185,129,0.15)]' : 'bg-emerald-600'} transition-all`} />
            <span className="text-xs text-neutral-600 dark:text-neutral-300">Live feed</span>
          </div>

          <button
            onClick={() => setDark((d) => !d)}
            className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 text-neutral-700 dark:text-neutral-200"
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {isAuthed ? (
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90"
            >
              <LogOut size={16} />
              <span className="text-sm">Logout</span>
            </button>
          ) : (
            <button
              onClick={onShowLogin}
              className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/60"
            >
              <Bell size={16} />
              <span className="text-sm">Sign in</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
