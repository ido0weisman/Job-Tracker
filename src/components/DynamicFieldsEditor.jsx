import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { FIELD_POOL } from '../constants'
import StarRating from './StarRating'

const inputClasses =
  'w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 ' +
  'px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400'

const CUSTOM_OPTION = '__custom__'

// lets the user add, edit, and delete the modular fields attached to a job.
// fields can come from the predefined pool, or be fully custom-named.
function DynamicFieldsEditor({ fields, onChange }) {
  const [isAddingCustom, setIsAddingCustom] = useState(false)
  const [customLabel, setCustomLabel] = useState('')

  // predefined options that haven't already been added to this job
  const availableOptions = FIELD_POOL.filter(
    (option) => !fields.some((field) => field.label === option.label),
  )

  function addField(newField) {
    onChange([...fields, { id: crypto.randomUUID(), value: '', ...newField }])
  }

  function updateFieldValue(id, value) {
    onChange(fields.map((field) => (field.id === id ? { ...field, value } : field)))
  }

  function removeField(id) {
    onChange(fields.filter((field) => field.id !== id))
  }

  function handlePoolSelect(event) {
    const selected = event.target.value
    event.target.value = ''

    if (!selected) return
    if (selected === CUSTOM_OPTION) {
      setIsAddingCustom(true)
      return
    }

    const poolField = FIELD_POOL.find((option) => option.label === selected)
    addField({ label: poolField.label, type: poolField.type })
  }

  function confirmCustomField() {
    if (!customLabel.trim()) return
    addField({ label: customLabel.trim(), type: 'text' })
    setCustomLabel('')
    setIsAddingCustom(false)
  }

  return (
    <div className="flex flex-col gap-3">
      {fields.map((field) => (
        <div key={field.id} className="flex items-start gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">{field.label}</label>

            {field.type === 'rating' && (
              <StarRating
                value={field.value}
                onChange={(rating) => updateFieldValue(field.id, rating)}
              />
            )}

            {field.type === 'textarea' && (
              <textarea
                rows={2}
                dir="auto"
                value={field.value}
                onChange={(event) => updateFieldValue(field.id, event.target.value)}
                className={inputClasses}
              />
            )}

            {(field.type === 'text' || field.type === 'url') && (
              <input
                type={field.type === 'url' ? 'url' : 'text'}
                dir="auto"
                value={field.value}
                onChange={(event) => updateFieldValue(field.id, event.target.value)}
                className={inputClasses}
              />
            )}
          </div>

          <button
            type="button"
            onClick={() => removeField(field.id)}
            aria-label={`Remove ${field.label}`}
            className="mt-7 text-slate-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}

      {isAddingCustom ? (
        <div className="flex items-center gap-2">
          <input
            type="text"
            dir="auto"
            autoFocus
            placeholder="Custom field name"
            value={customLabel}
            onChange={(event) => setCustomLabel(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && confirmCustomField()}
            className={inputClasses}
          />
          <button
            type="button"
            onClick={confirmCustomField}
            className="px-3 py-2 text-sm rounded-md bg-slate-200 dark:bg-slate-700 hover:brightness-95 transition-all"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => {
              setIsAddingCustom(false)
              setCustomLabel('')
            }}
            className="text-sm text-slate-500 dark:text-slate-400"
          >
            Cancel
          </button>
        </div>
      ) : (
        <select
          onChange={handlePoolSelect}
          defaultValue=""
          className={inputClasses}
        >
          <option value="" disabled>
            + Add a field...
          </option>
          {availableOptions.map((option) => (
            <option key={option.label} value={option.label}>
              {option.label}
            </option>
          ))}
          <option value={CUSTOM_OPTION}>Custom field...</option>
        </select>
      )}
    </div>
  )
}

export default DynamicFieldsEditor
