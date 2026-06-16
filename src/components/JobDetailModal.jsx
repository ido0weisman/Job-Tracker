import { Sparkles, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { COLUMNS, NEXT_STEP_STATUSES } from '../constants'
import { buildPrompt } from '../utils/prompt'
import DynamicFieldsEditor from './DynamicFieldsEditor'
import Modal from './Modal'
import PromptModal from './PromptModal'
import StarRating from './StarRating'

const inputClasses =
  'w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 ' +
  'px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400'

// expanded view of a job card. every field is directly editable and saves
// immediately via onUpdate, so there's no separate "save" step.
function JobDetailModal({ job, onClose, onUpdate, onDelete }) {
  const [isPromptOpen, setIsPromptOpen] = useState(false)
  const showsNextStepField = NEXT_STEP_STATUSES.includes(job.status)

  function updateField(field, value) {
    onUpdate(job.id, { [field]: value })
  }

  // moving out of an active stage means there's no "next step" anymore
  function updateStatus(newStatus) {
    const changes = { status: newStatus }
    if (!NEXT_STEP_STATUSES.includes(newStatus)) changes.next_step_date = null
    onUpdate(job.id, changes)
  }

  function handleDelete() {
    onDelete(job.id)
    onClose()
  }

  return (
    <Modal title="Job Details" onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Company Name</label>
          <input
            type="text"
            dir="auto"
            value={job.company_name}
            onChange={(event) => updateField('company_name', event.target.value)}
            className={inputClasses}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Role Name</label>
          <input
            type="text"
            dir="auto"
            value={job.role_name}
            onChange={(event) => updateField('role_name', event.target.value)}
            className={inputClasses}
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Application Date</label>
            <input
              type="date"
              value={job.application_date}
              onChange={(event) => updateField('application_date', event.target.value)}
              className={inputClasses}
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={job.status}
              onChange={(event) => updateStatus(event.target.value)}
              className={inputClasses}
            >
              {COLUMNS.map((column) => (
                <option key={column} value={column}>
                  {column}
                </option>
              ))}
            </select>
          </div>
        </div>

        {showsNextStepField && (
          <div>
            <label className="block text-sm font-medium mb-1">Next Step Date</label>
            <input
              type="date"
              value={job.next_step_date ?? ''}
              onChange={(event) => updateField('next_step_date', event.target.value || null)}
              className={inputClasses}
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Source</label>
          <input
            type="text"
            dir="auto"
            value={job.source}
            onChange={(event) => updateField('source', event.target.value)}
            className={inputClasses}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Company Background</label>
          <textarea
            rows={2}
            dir="auto"
            value={job.company_background}
            onChange={(event) => updateField('company_background', event.target.value)}
            className={inputClasses}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Role Background</label>
          <textarea
            rows={2}
            dir="auto"
            value={job.role_background}
            onChange={(event) => updateField('role_background', event.target.value)}
            className={inputClasses}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Job Rating</label>
          <StarRating value={job.rating} onChange={(value) => updateField('rating', value)} />
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
          <h3 className="text-sm font-medium mb-3">Additional Fields</h3>
          <DynamicFieldsEditor
            fields={job.dynamic_fields}
            onChange={(fields) => updateField('dynamic_fields', fields)}
          />
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 pt-4 flex justify-between items-center">
          <button
            type="button"
            onClick={() => setIsPromptOpen(true)}
            className="flex items-center gap-1.5 text-sm font-medium rounded-md px-3 py-1.5
              bg-slate-100 dark:bg-slate-700 hover:brightness-95 transition-all"
          >
            <Sparkles size={16} />
            Generate Prompt
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400 hover:underline"
          >
            <Trash2 size={16} />
            Delete Job
          </button>
        </div>
      </div>

      {isPromptOpen && (
        <PromptModal prompt={buildPrompt(job)} onClose={() => setIsPromptOpen(false)} />
      )}
    </Modal>
  )
}

export default JobDetailModal
