import { useEffect, useMemo, useRef, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import HeroScene from './components/HeroScene.jsx';
import AnalyticsCards from './components/AnalyticsCards.jsx';
import EmployeeGrid from './components/EmployeeGrid.jsx';
import ThreatTable from './components/ThreatTable.jsx';
import LoginModal from './components/LoginModal.jsx';

function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

export default function App() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [selected, setSelected] = useState(null);
  const [logs, setLogs] = useState([]);
  const [employees, setEmployees] = useState([]);
  const wsRef = useRef(null);

  const backendURL = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, '') || 'http://localhost:8000';

  // When authenticated: fetch initial data and open WebSocket
  useEffect(() => {
    if (!isAuthed) {
      // Cleanup on logout
      if (wsRef.current) {
        try { wsRef.current.close(); } catch {}
        wsRef.current = null;
      }
      setLogs([]);
      setEmployees([]);
      return;
    }

    let cancelled = false;

    const loadInitial = async () => {
      try {
        const [empRes, logRes] = await Promise.all([
          fetch(`${backendURL}/employees`),
          fetch(`${backendURL}/logs`),
        ]);
        const [empData, logData] = await Promise.all([empRes.json(), logRes.json()]);
        if (!cancelled) {
          setEmployees(empData || []);
          setLogs(Array.isArray(logData) ? logData.map(l => ({...l, time: new Date(l.time).getTime()})) : []);
        }
      } catch (e) {
        console.error('Failed loading initial data', e);
      }
    };

    loadInitial();

    // Open WebSocket for live logs
    try {
      const wsUrl = backendURL.replace(/^http/, 'ws') + '/ws';
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;
      ws.onmessage = (ev) => {
        try {
          const msg = JSON.parse(ev.data);
          if (msg?.type === 'log' && msg.payload) {
            const payload = msg.payload;
            const ts = new Date(payload.time).getTime();
            setLogs((prev) => [...prev, { ...payload, time: ts }].slice(-150));
            // Nudge employee risk based on event severity
            setEmployees((prev) => {
              const next = prev.map((e) => {
                if (e.name === payload.employee) {
                  const delta = payload.severity === 'high' ? 6 : payload.severity === 'medium' ? 3 : 1;
                  return { ...e, threatScore: clamp((e.threatScore ?? 0) + delta, 0, 100) };
                }
                // gentle decay for others
                return { ...e, threatScore: clamp((e.threatScore ?? 0) - 1, 0, 100) };
              });
              return next;
            });
          }
        } catch (e) {
          console.warn('WS parse error', e);
        }
      };
      ws.onerror = (e) => {
        console.error('WebSocket error', e);
      };
      ws.onclose = () => {
        // optional: retry logic could be added
      };
    } catch (e) {
      console.error('Failed to open WebSocket', e);
    }

    return () => {
      cancelled = true;
      if (wsRef.current) {
        try { wsRef.current.close(); } catch {}
        wsRef.current = null;
      }
    };
  }, [isAuthed, backendURL]);

  const handleLogout = () => {
    setIsAuthed(false);
  };

  const handleLoginSuccess = (user) => {
    setIsAuthed(true);
    setShowLogin(false);
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

      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} onSuccess={handleLoginSuccess} backendURL={backendURL} />
    </div>
  );
}
