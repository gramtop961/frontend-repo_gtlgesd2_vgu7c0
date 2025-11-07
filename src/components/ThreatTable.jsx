import { useEffect, useRef } from 'react';

export default function ThreatTable({ logs }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [logs]);

  const rowColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400';
      case 'medium':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400';
      default:
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
    }
  };

  return (
    <section className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-neutral-900 dark:text-white">Live threat feed</h3>
        <span className="text-xs text-neutral-500">Top 50</span>
      </div>
      <div ref={ref} className="max-h-72 overflow-y-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 dark:bg-neutral-900/60 text-neutral-500">
            <tr>
              <th className="text-left p-2">Time</th>
              <th className="text-left p-2">Employee</th>
              <th className="text-left p-2">Event</th>
              <th className="text-left p-2">Severity</th>
            </tr>
          </thead>
          <tbody>
            {logs.slice(-50).map((l, i) => (
              <tr key={i} className="border-t border-neutral-100 dark:border-neutral-800">
                <td className="p-2 text-neutral-600 dark:text-neutral-300 whitespace-nowrap">{new Date(l.time).toLocaleTimeString()}</td>
                <td className="p-2 text-neutral-800 dark:text-neutral-100">{l.employee}</td>
                <td className="p-2 text-neutral-700 dark:text-neutral-200">{l.event}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${rowColor(l.severity)}`}>{l.severity}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
