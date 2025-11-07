import { useMemo } from 'react';
import { User, ShieldAlert } from 'lucide-react';

export default function EmployeeGrid({ employees = [], onSelect }) {
  const sorted = useMemo(() => {
    return [...employees].sort((a, b) => b.threatScore - a.threatScore);
  }, [employees]);

  return (
    <section className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-neutral-900 dark:text-white">Employees</h3>
        <span className="text-xs text-neutral-500">Sorted by risk</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((e) => (
          <button
            key={e.id}
            onClick={() => onSelect?.(e)}
            className="text-left p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500/40 bg-neutral-50/60 dark:bg-neutral-900/60 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center">
                <User size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-neutral-900 dark:text-white truncate">{e.name}</div>
                <div className="text-xs text-neutral-500 truncate">{e.role} • {e.location}</div>
              </div>
              <div className="flex items-center gap-1 text-rose-500">
                <ShieldAlert size={16} />
                <span className="text-sm font-medium">{e.threatScore}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
