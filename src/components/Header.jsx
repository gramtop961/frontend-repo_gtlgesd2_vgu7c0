import { Home, Settings, User } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" />
            <span className="text-lg font-semibold tracking-tight text-slate-900">Vibe Dashboard</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#home" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
              <Home className="h-4 w-4" /> Home
            </a>
            <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">Features</a>
            <a href="#about" className="text-slate-600 hover:text-slate-900 transition-colors">About</a>
          </nav>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm hover:bg-slate-50">
              <Settings className="h-4 w-4" /> Settings
            </button>
            <button className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow hover:bg-indigo-500">
              <User className="h-4 w-4" /> Sign in
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
