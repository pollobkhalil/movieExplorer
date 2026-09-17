import { Star } from 'lucide-react';

const PLACEHOLDER_IMAGE = 'https://placehold.co/210x295/1e293b/64748b?text=No+Image';

export default function MovieCard({ movie, onSelect }) {
  if (!movie) return null;

  const { name, image, rating, year } = movie;
  const posterUrl = image || PLACEHOLDER_IMAGE;
  const displayRating = typeof rating === 'number' ? rating.toFixed(1) : 'N/A';
  const displayYear = year || 'Unknown';

  const handleOpen = () => onSelect(movie);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleOpen();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleOpen}
      onKeyDown={handleKeyDown}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-white/10 bg-slate-800/60 transition-all duration-200 hover:-translate-y-1 hover:border-amber-400/40 hover:shadow-xl hover:shadow-amber-500/10 focus:outline-none focus:ring-2 focus:ring-amber-400"
    >
      <div className="aspect-[2/3] w-full overflow-hidden bg-slate-700">
        <img
          src={posterUrl}
          alt={name ? `${name} poster` : 'Poster not available'}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = PLACEHOLDER_IMAGE;
          }}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        <h3 className="line-clamp-2 text-sm font-semibold text-white sm:text-base">
          {name || 'Untitled'}
        </h3>

        <div className="flex items-center justify-between text-xs text-slate-400 sm:text-sm">
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
            {displayRating}
          </span>
          <span>{displayYear}</span>
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleOpen();
          }}
          className="mt-2 w-full rounded-lg bg-white/5 px-3 py-2.5 text-xs font-semibold text-amber-300 transition-colors hover:bg-amber-500 hover:text-slate-950 sm:text-sm"
        >
          See details
        </button>
      </div>
    </div>
  );
}
