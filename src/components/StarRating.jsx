import { Star } from 'lucide-react'

// simple 1-5 star picker used for the "Job Rating" modular field.
// pass readOnly to render plain, non-interactive stars (showcase mode).
function StarRating({ value, onChange, readOnly = false }) {
  const rating = Number(value) || 0

  if (readOnly) {
    return (
      <div className="flex gap-1 text-amber-500">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} size={20} fill={star <= rating ? 'currentColor' : 'none'} />
        ))}
      </div>
    )
  }

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          aria-label={`Rate ${star} star${star === 1 ? '' : 's'}`}
          className="text-amber-500"
        >
          <Star size={20} fill={star <= rating ? 'currentColor' : 'none'} />
        </button>
      ))}
    </div>
  )
}

export default StarRating
