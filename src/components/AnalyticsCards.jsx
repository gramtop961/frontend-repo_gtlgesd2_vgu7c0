import { useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ShieldAlert, Activity } from 'lucide-react';

export default function AnalyticsCards({ logs }) {
  const byHour = useMemo(() => {
    const buckets = new Map();
    logs.forEach((l) => {
      const d = new Date(l.time);
      const key = `${d.getHours()}:00`;
      buckets.set(key, (buckets.get(key) || 0) + 1);
    });
    return Array.from(buckets.entries()).map(([name, value]) => ({ name, value }));
  }, [logs]);

  const severities = useMemo(() => {
    const s = { low: 0, medium: 0, high: 0 };
    logs.forEach((l) => (s[l.severity] = (s[l.severity] || 0) + 1));
    return [
      { name: 'Low', value: s.low },
      { name: 'Medium', value: s.medium },
      { name: 'High', value: s.high },
    ];
  }, [logs]);

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4" id="dashboard">
      <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <div className="flex items-center justify-between">
          <div className="text-sm text-neutral-500">Threats (hourly)</div>
          <Activity size={16} className="text-emerald-500" />
        </div>
        <div className="h-28 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={byHour} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,120,120,.2)" />
              <XAxis dataKey="name" stroke="currentColor" className="text-xs fill-neutral-400" hide />
              <YAxis stroke="currentColor" className="text-xs fill-neutral-400" hide />
              <Tooltip contentStyle={{ background: '#111827', border: '1px solid #374151', color: 'white' }} />
              <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <div className="flex items-center justify-between">
          <div className="text-sm text-neutral-500">Active alerts</div>
          <ShieldAlert size={16} className="text-rose-500" />
        </div>
        <div className="mt-2 text-3xl font-semibold text-neutral-900 dark:text-white">
          {logs.filter((l) => l.severity !== 'low').length}
        </div>
        <div className="text-xs text-neutral-500 mt-1">Medium/High severity</div>
      </div>

      <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <div className="flex items-center justify-between">
          <div className="text-sm text-neutral-500">Severity distribution</div>
          <Activity size={16} className="text-sky-500" />
        </div>
        <div className="h-28 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={severities} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,120,120,.2)" />
              <XAxis dataKey="name" stroke="currentColor" className="text-xs fill-neutral-400" />
              <YAxis stroke="currentColor" className="text-xs fill-neutral-400" hide />
              <Tooltip contentStyle={{ background: '#111827', border: '1px solid #374151', color: 'white' }} />
              <Bar dataKey="value" fill="#10B981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
