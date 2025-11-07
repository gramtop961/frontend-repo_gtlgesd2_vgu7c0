export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">© {year} Vibe Dashboard. All rights reserved.</p>
        <nav className="flex items-center gap-4 text-sm text-slate-600">
          <a href="#privacy" className="hover:text-slate-900">Privacy</a>
          <a href="#terms" className="hover:text-slate-900">Terms</a>
          <a href="#contact" className="hover:text-slate-900">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
