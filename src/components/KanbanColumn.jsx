import { ArrowUpDown } from 'lucide-react'
import { useState } from 'react'
import { SORT_OPTIONS, sortJobs } from '../utils/sort'
import JobCard from './JobCard'

// a single kanban column: a title header plus its stack of job cards.
// also acts as a drop target so cards can be dragged in from other columns.
// each column has its own sort order, independent of the others.
function KanbanColumn({ title, jobs, onCardClick, onEditClick, onDropJob }) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [sortBy, setSortBy] = useState('default')

  const sortedJobs = sortJobs(jobs, sortBy)

  function handleDragOver(event) {
    event.preventDefault()
    setIsDragOver(true)
  }

  function handleDrop(event) {
    event.preventDefault()
    setIsDragOver(false)
    const jobId = event.dataTransfer.getData('text/plain')
    if (jobId) onDropJob(jobId, title)
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      className={`flex flex-col bg-white dark:bg-slate-800/60 border shadow-sm rounded-lg p-3 min-w-0
        transition-colors ${
          isDragOver
            ? 'border-blue-400 dark:border-blue-500'
            : 'border-slate-200 dark:border-transparent'
        }`}
    >
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-slate-700 dark:text-slate-200 font-medium text-sm">{title}</h2>
        <span className="text-slate-500 dark:text-slate-400 text-xs bg-slate-200 dark:bg-slate-700 rounded-full px-2 py-0.5">
          {jobs.length}
        </span>
      </div>

      <div className="relative mb-3">
        <ArrowUpDown
          size={13}
          className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
        />
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          aria-label={`Sort ${title}`}
          className="w-full appearance-none rounded-full border border-slate-200 dark:border-slate-700
            bg-slate-50 dark:bg-slate-900 pl-7 pr-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300
            hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-3 min-h-[60px]">
        {sortedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onClick={() => onCardClick(job.id)}
            onEditClick={() => onEditClick(job.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default KanbanColumn
