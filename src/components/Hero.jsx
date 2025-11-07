import Spline from "@splinetool/react-spline";

export default function Hero() {
  return (
    <section id="home" className="relative h-[70vh] min-h-[520px] w-full overflow-hidden rounded-b-2xl">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/u6IhUEJtxeBPqgDa/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <div className="relative z-10 mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Build faster. Ship prettier.
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            A modern starter showcasing a clean layout, 3D hero, and componentized
            structure. Fully responsive and production-ready.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="#features"
              className="rounded-md bg-indigo-600 px-4 py-2 text-white shadow hover:bg-indigo-500"
            >
              Explore features
            </a>
            <a
              href="#about"
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-800 shadow-sm hover:bg-slate-50"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-white/80" />
    </section>
  );
}
