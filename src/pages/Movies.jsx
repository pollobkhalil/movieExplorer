import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, Film, Search } from 'lucide-react';
import Footer from '../components/Footer';
import MovieModal from '../components/MovieModal';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import { useDebounce } from '../hooks/useDebounce';




const INITIAL_SHOWS_URL = 'https://api.tvmaze.com/shows';
const SEARCH_SHOWS_URL = 'https://api.tvmaze.com/search/shows';


function normalizeShow(rawItem) {
  const show = rawItem && rawItem.show ? rawItem.show : rawItem;
  if (!show || typeof show.id === 'undefined') return null;

  return {
    id: show.id,
    name: show.name || 'Untitled',
    image: (show.image && show.image.medium) || null,
    imageOriginal: (show.image && (show.image.original || show.image.medium)) || null,
    rating: typeof show.rating?.average === 'number' ? show.rating.average : null,
    premiered: show.premiered || null,
    year: show.premiered ? show.premiered.slice(0, 4) : null,
    genres: Array.isArray(show.genres) ? show.genres : [],
    summary: show.summary || null,
  };
}

function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-slate-800/60">
      <div className="aspect-[2/3] w-full animate-pulse bg-slate-700" />
      <div className="flex flex-col gap-2 p-3 sm:p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-700" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-slate-700" />
        <div className="mt-2 h-9 w-full animate-pulse rounded bg-slate-700" />
      </div>
    </div>
  );
}

export default function Movies() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  
  useEffect(() => {
    const controller = new AbortController();
    const trimmedQuery = debouncedQuery.trim();
    const url = trimmedQuery
      ? `${SEARCH_SHOWS_URL}?q=${encodeURIComponent(trimmedQuery)}`
      : INITIAL_SHOWS_URL;

    setLoading(true);
    setError(null);

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((rawData) => {
        const list = Array.isArray(rawData) ? rawData : [];
        const normalized = list.map(normalizeShow).filter((show) => show !== null);
        setMovies(normalized);
        setLoading(false);
      })
      .catch((fetchError) => {
        if (fetchError.name === 'AbortError') return;
        setError("We couldn't load shows right now. Please try again.");
        setMovies([]);
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [debouncedQuery]);

  const heading = useMemo(() => {
    const trimmedQuery = debouncedQuery.trim();
    return trimmedQuery ? `Results for "${trimmedQuery}"` : 'Popular shows';
  }, [debouncedQuery]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-900 text-white">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">Browse shows</h1>
              <p className="mt-1 text-sm text-slate-400">{heading}</p>
            </div>

            <div className="relative w-full sm:w-80">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                aria-hidden="true"
              />
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search for a show..."
                aria-label="Search for a show"
                className="w-full rounded-lg border border-white/10 bg-slate-800 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>
          </div>

          <div className="mt-8">
            {error && (
              <div className="flex flex-col items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-12 text-center">
                <AlertTriangle className="h-8 w-8 text-red-400" aria-hidden="true" />
                <p className="text-base font-medium text-red-200">{error}</p>
              </div>
            )}

            {!error && loading && (
              <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
                {Array.from({ length: 10 }).map((_, index) => (
                  <SkeletonCard key={`skeleton-${index}`} />
                ))}
              </div>
            )}

            {!error && !loading && movies.length === 0 && (
              <div className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-slate-800/40 px-6 py-16 text-center">
                <Film className="h-8 w-8 text-slate-500" aria-hidden="true" />
                <p className="text-base font-medium text-slate-300">No shows found.</p>
                <p className="text-sm text-slate-500">Try a different title or check your spelling.</p>
              </div>
            )}

            {!error && !loading && movies.length > 0 && (
              <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
                {movies.map((movie) => (
                 <MovieCard key={movie.id} movie={movie} onSelect={setSelectedMovie} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

   <Footer />

      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)}/>
    </div>
  );
}
