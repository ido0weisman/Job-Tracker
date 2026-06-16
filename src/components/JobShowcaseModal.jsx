import { Pencil } from 'lucide-react'
import { NEXT_STEP_STATUSES } from '../constants'
import { daysUntil, describeNextStep, formatDate } from '../utils/dates'
import Modal from './Modal'
import StarRating from './StarRating'

const NEXT_STEP_TONE_CLASSES = {
  overdue: 'text-red-700 dark:text-red-400 font-medium',
  soon: 'text-orange-700 dark:text-orange-400 font-medium',
  normal: 'text-slate-700 dark:text-slate-300',
}

// read-only display of every field saved for a job. no inputs, no editing -
// just a clean, formatted view. an "Edit" button hands off to the build modal.
function JobShowcaseModal({ job, onClose, onEditClick }) {
  const showsNextStep = NEXT_STEP_STATUSES.includes(job.status) && job.next_step_date
  const nextStep = showsNextStep ? describeNextStep(daysUntil(job.next_step_date)) : null

  return (
    <Modal title={<span dir="auto">{job.company_name}</span>} onClose={onClose}>
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold leading-tight" dir="auto">{job.role_name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{job.status}</p>
          </div>
          <button
            type="button"
            onClick={onEditClick}
            className="flex items-center gap-1.5 text-sm font-medium rounded-md px-3 py-1.5
              bg-slate-100 dark:bg-slate-700 hover:brightness-95 transition-all shrink-0"
          >
            <Pencil size={14} />
            Edit
          </button>
        </div>

        {nextStep && (
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Next Step</p>
            <p className={`text-sm ${NEXT_STEP_TONE_CLASSES[nextStep.tone]}`}>
              {nextStep.label} ({formatDate(job.next_step_date)})
            </p>
          </div>
        )}

        <ShowcaseField label="Application Date" value={formatDate(job.application_date)} />
        <ShowcaseField label="Source" value={job.source} />
        <ShowcaseField label="Company Background" value={job.company_background} multiline />
        <ShowcaseField label="Role Background" value={job.role_background} multiline />

        {job.dynamic_fields?.length > 0 && (
          <div className="border-t border-slate-200 dark:border-slate-700 pt-4 flex flex-col gap-4">
            {job.dynamic_fields.map((field) => (
              <div key={field.id}>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                  {field.label}
                </p>
                <DynamicFieldValue field={field} />
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  )
}

// renders a single fixed field, hiding itself entirely if there's no value to show
function ShowcaseField({ label, value, multiline = false }) {
  if (!value) return null

  return (
    <div>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{label}</p>
      <p dir="auto" className={multiline ? 'text-sm whitespace-pre-wrap' : 'text-sm'}>{value}</p>
    </div>
  )
}

// renders a modular field's value according to its type
function DynamicFieldValue({ field }) {
  if (field.type === 'rating') {
    return <StarRating value={field.value} readOnly />
  }

  if (field.type === 'url' && field.value) {
    return (
      <a
        href={field.value}
        target="_blank"
        rel="noreferrer"
        className="text-sm text-blue-600 dark:text-blue-400 hover:underline break-all"
      >
        {field.value}
      </a>
    )
  }

  if (!field.value) {
    return <p className="text-sm text-slate-400 dark:text-slate-500 italic">Not set</p>
  }

  return <p dir="auto" className="text-sm whitespace-pre-wrap">{field.value}</p>
}

export default JobShowcaseModal
