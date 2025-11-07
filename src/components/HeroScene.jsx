import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function HeroScene() {
  return (
    <section className="relative h-[340px] sm:h-[420px] md:h-[520px] overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full h-full"
      >
        <Spline
          scene="https://prod.spline.design/UqI6cN9P7bqv4mZs/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent dark:from-neutral-950 dark:via-neutral-950/40" />

      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white">
            Monitor, detect, and respond in real-time
          </h1>
          <p className="mt-2 text-neutral-600 dark:text-neutral-300 max-w-2xl">
            Unified visibility across employees, devices, and network signals. AI-assisted triage and workflow automation out of the box.
          </p>
        </div>
        <div className="pointer-events-auto">
          <a
            href="#dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm"
          >
            Explore dashboard
          </a>
        </div>
      </div>
    </section>
  );
}
