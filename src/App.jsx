import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import HeroScene from './components/HeroScene.jsx';
import AnalyticsCards from './components/AnalyticsCards.jsx';
import EmployeeGrid from './components/EmployeeGrid.jsx';
import ThreatTable from './components/ThreatTable.jsx';
import LoginModal from './components/LoginModal.jsx';

function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

export default function App() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [selected, setSelected] = useState(null);
  const [logs, setLogs] = useState([]);
  const [employees, setEmployees] = useState(() => (
    Array.from({ length: 9 }).map((_, i) => ({
      id: i + 1,
      name: `Employee ${i + 1}`,
      role: ['Engineer', 'Analyst', 'Manager'][i % 3],
      location: ['NYC', 'SF', 'Remote'][i % 3],
      threatScore: Math.floor(Math.random() * 100),
    }))
  ));

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) => {
        const events = ['Login attempt', 'USB mounted', 'Suspicious process', 'Network spike', 'File exfiltration'];
        const severity = randomItem(['low', 'medium', 'high']);
        const employee = randomItem(employees).name;
        const next = [...prev, { time: Date.now(), event: randomItem(events), employee, severity }];
        return next.slice(-150);
      });
      setEmployees((prev) => prev.map((e) => ({
        ...e,
        threatScore: Math.max(0, Math.min(100, e.threatScore + Math.floor(Math.random() * 11) - 5)),
      })));
    }, 1800);
    return () => clearInterval(interval);
  }, [employees]);

  const page = isAuthed ? 'dashboard' : 'login';

  const handleLogout = () => {
    setIsAuthed(false);
  };

  const handleLoginSuccess = (user) => {
    setIsAuthed(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <Navbar isAuthed={isAuthed} onLogout={handleLogout} onShowLogin={() => setShowLogin(true)} />

      {!isAuthed && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <HeroScene />
          <div className="mt-6 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Welcome to ScaleShield</h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300">Sign in to access your security dashboard. Use an email containing the word "admin" to preview the admin role.</p>
            <div className="mt-4">
              <button onClick={() => setShowLogin(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600">Open login</button>
            </div>
          </div>
        </div>
      )}

      {isAuthed && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <HeroScene />
          <AnalyticsCards logs={logs} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <EmployeeGrid employees={employees} onSelect={setSelected} />
            </div>
            <div>
              <ThreatTable logs={logs} />
            </div>
          </div>
        </main>
      )}

      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} onSuccess={handleLoginSuccess} />
    </div>
  );
}
