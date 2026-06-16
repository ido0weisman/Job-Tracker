import { Pencil } from 'lucide-react'
import { NEXT_STEP_STATUSES } from '../constants'
import { daysSince, daysUntil, describeNextStep } from '../utils/dates'
import StarRating from './StarRating'

const NEXT_STEP_TONE_CLASSES = {
  overdue: 'text-red-700 dark:text-red-700 font-medium',
  soon: 'text-orange-700 dark:text-orange-800 font-medium',
  normal: 'text-slate-600',
}

// collapsed "sticky note" card shown on the kanban board.
// shows company, role, days since applied, and (while in an active stage
// with a next step date set) a countdown to that next step.
// color flips with the theme: yellowish in dark mode, red in light mode.
// clicking the card opens a read-only showcase view; the pencil opens editing;
// dragging the card onto another column moves it to that stage.
function JobCard({ job, onClick, onEditClick }) {
  const days = daysSince(job.application_date)

  const showsNextStep = NEXT_STEP_STATUSES.includes(job.status) && job.next_step_date
  const nextStep = showsNextStep ? describeNextStep(daysUntil(job.next_step_date)) : null

  function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', job.id)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={onClick}
      className="relative bg-red-200 dark:bg-amber-200 text-slate-800 rounded-md shadow-md p-4
        cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150"
    >
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          onEditClick()
        }}
        aria-label="Edit job"
        className="absolute top-2 right-2 text-slate-500 hover:text-slate-800 transition-colors"
      >
        <Pencil size={14} />
      </button>

      <h3 className="font-semibold text-sm leading-tight truncate pr-5" dir="auto">
        {job.company_name}
      </h3>
      <p className="text-sm text-slate-600 truncate mt-1" dir="auto">{job.role_name}</p>

      {job.rating && (
        <div className="mt-2">
          <StarRating value={job.rating} readOnly size={14} />
        </div>
      )}

      {nextStep && (
        <p className={`text-xs mt-3 ${NEXT_STEP_TONE_CLASSES[nextStep.tone]}`}>{nextStep.label}</p>
      )}

      <p className={`text-xs text-slate-500 ${nextStep ? 'mt-1' : 'mt-3'}`}>
        {days === 0 ? 'Applied today' : `${days} day${days === 1 ? '' : 's'} since applied`}
      </p>
    </div>
  )
}

export default JobCard
