import { useState } from 'react'
import Modal from './Modal'
import StarRating from './StarRating'

const inputClasses =
  'w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 ' +
  'px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400'

const initialFormState = {
  company_name: '',
  role_name: '',
  application_date: new Date().toISOString().slice(0, 10),
  source: '',
  company_background: '',
  role_background: '',
  rating: null,
}

// form modal for creating a new job. only company and role are required;
// everything else can be filled in later from the expanded card.
function AddJobModal({ onClose, onAdd }) {
  const [form, setForm] = useState(initialFormState)

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!form.company_name.trim() || !form.role_name.trim()) return

    onAdd(form)
    onClose()
  }

  return (
    <Modal title="Add Job" onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Company Name *</label>
          <input
            type="text"
            dir="auto"
            value={form.company_name}
            onChange={(event) => updateField('company_name', event.target.value)}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Role Name *</label>
          <input
            type="text"
            dir="auto"
            value={form.role_name}
            onChange={(event) => updateField('role_name', event.target.value)}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Application Date</label>
          <input
            type="date"
            value={form.application_date}
            onChange={(event) => updateField('application_date', event.target.value)}
            className={inputClasses}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Source</label>
          <input
            type="text"
            dir="auto"
            placeholder="e.g. LinkedIn, Referral, Company Website"
            value={form.source}
            onChange={(event) => updateField('source', event.target.value)}
            className={inputClasses}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Company Background</label>
          <textarea
            rows={2}
            dir="auto"
            value={form.company_background}
            onChange={(event) => updateField('company_background', event.target.value)}
            className={inputClasses}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Role Background</label>
          <textarea
            rows={2}
            dir="auto"
            value={form.role_background}
            onChange={(event) => updateField('role_background', event.target.value)}
            className={inputClasses}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Job Rating</label>
          <StarRating value={form.rating} onChange={(value) => updateField('rating', value)} />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm rounded-md bg-red-100 dark:bg-amber-100 text-slate-800 font-medium hover:brightness-95 transition-all"
          >
            Add Job
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AddJobModal
