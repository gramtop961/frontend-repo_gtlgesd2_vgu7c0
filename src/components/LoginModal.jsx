import { useState } from 'react';
import { Lock, Mail } from 'lucide-react';

export default function LoginModal({ open, onClose, onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Placeholder auth: accept any non-empty credentials
      await new Promise((r) => setTimeout(r, 600));
      if (!email || !password) throw new Error('Enter email and password');
      onSuccess?.({ email, role: email.includes('admin') ? 'admin' : 'analyst' });
      onClose?.();
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-sm p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Sign in</h2>
        <p className="text-sm text-neutral-500 mt-1">Access your ScaleShield dashboard</p>

        <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs text-neutral-500">Email</label>
            <div className="mt-1 flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 px-3 py-2">
              <Mail size={16} className="text-neutral-400" />
              <input
                type="email"
                className="w-full bg-transparent outline-none text-sm"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-neutral-500">Password</label>
            <div className="mt-1 flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 px-3 py-2">
              <Lock size={16} className="text-neutral-400" />
              <input
                type="password"
                className="w-full bg-transparent outline-none text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <div className="text-sm text-rose-500">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
