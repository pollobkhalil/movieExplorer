import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import parse from 'html-react-parser';
import { Calendar, Star, X } from 'lucide-react';

const PLACEHOLDER_IMAGE = 'https://placehold.co/640x360/1e293b/64748b?text=No+Image';

export default function MovieModal({ movie, onClose }) {
  
  useEffect(() => {
    if (!movie) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [movie, onClose]);

  if (!movie) return null;

  const { name, imageOriginal, rating, premiered, genres, summary } = movie;
  const backdropImage = imageOriginal || PLACEHOLDER_IMAGE;
  const displayRating = typeof rating === 'number' ? rating.toFixed(1) : 'N/A';
  const displayGenres =
    Array.isArray(genres) && genres.length > 0 ? genres.join(', ') : 'Not specified';

  const handleBackdropClick = (event) => {
    
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8"
        onClick={handleBackdropClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          key="content"
          role="dialog"
          aria-modal="true"
          aria-label={name || 'Show details'}
          className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-slate-900 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/70 text-white transition-colors hover:bg-slate-950"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="aspect-video w-full overflow-hidden rounded-t-2xl bg-slate-800">
            <img
              src={backdropImage}
              alt={name ? `${name} artwork` : 'Artwork not available'}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = PLACEHOLDER_IMAGE;
              }}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">{name || 'Untitled'}</h2>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-300">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                {displayRating}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-slate-400" aria-hidden="true" />
                {premiered || 'Unknown premiere date'}
              </span>
              <span className="text-slate-400">{displayGenres}</span>
            </div>

            <div className="mt-6 space-y-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              {summary ? parse(summary) : <p>No summary available for this show.</p>}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
