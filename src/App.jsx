import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <Header />
      <main>
        <Hero />
        <Features />
        <section id="about" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">About this starter</h2>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  This aesthetic template is built with React, Vite and Tailwind. It features a 3D hero
                  section, a clean component structure, and responsive design out of the box.
                </p>
                <ul className="mt-6 space-y-2 text-slate-700 list-disc list-inside">
                  <li>Fast, modern build tooling</li>
                  <li>Accessible, responsive components</li>
                  <li>Ready for API integration</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold">Get started</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Replace these sections with your content. Hook up your API using the provided environment
                  variable for the backend URL.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <a href="#" className="rounded-md bg-slate-900 px-4 py-2 text-white text-sm text-center hover:bg-slate-800">Docs</a>
                  <a href="#" className="rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-800 text-sm text-center hover:bg-slate-50">Components</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
