import { Rocket, Shield, Zap } from "lucide-react";

const features = [
  {
    title: "Blazing fast",
    desc: "Vite + React + Tailwind for instant feedback and smooth DX.",
    icon: Zap,
    color: "from-yellow-400 to-orange-500",
  },
  {
    title: "Secure by default",
    desc: " sensible defaults and clean patterns to scale confidently.",
    icon: Shield,
    color: "from-emerald-400 to-teal-500",
  },
  {
    title: "Launch-ready UI",
    desc: "Beautiful, accessible components with out-of-the-box theming.",
    icon: Rocket,
    color: "from-indigo-500 to-purple-500",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Features</h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          A curated set of pieces to help you move quickly while keeping your
          codebase clean and maintainable.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, desc, icon: Icon, color }) => (
            <div
              key={title}
              className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div
                className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${color} text-white`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-600">{desc}</p>
              <div className="mt-4 text-sm font-medium text-indigo-600 opacity-0 transition group-hover:opacity-100">
                Learn more →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
