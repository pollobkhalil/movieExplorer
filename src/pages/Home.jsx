import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-900 text-white">
      <Navbar />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 20%, rgba(245,158,11,0.15), transparent 40%), radial-gradient(circle at 80% 70%, rgba(99,102,241,0.12), transparent 45%)',
            }}
            aria-hidden="true"
          />

          <div className="relative mx-auto flex max-w-7xl flex-col items-start px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Every show ever made,
              <br />
              one search away.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-300">
              Movie Explorer pulls live data straight from TVmaze so you can browse thousands
              of shows, check ratings, and dig into full synopses in seconds.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/movies"
                className="flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-base font-semibold text-slate-950 transition-transform hover:scale-[1.03] hover:bg-amber-400"
              >
                <Search className="h-5 w-5" />
                Explore Now
              </Link>
              
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-slate-900 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 sm:grid-cols-3">
              <div>
                <h3 className="text-lg font-semibold text-white">Search anything</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Type a title and results update automatically as you pause typing.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">See what matters</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Ratings, premiere year, and genres are all visible before you click in.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Get the full picture</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Open any card for a full synopsis and artwork.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
