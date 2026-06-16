import { useState } from 'react'
import JobCard from './JobCard'

// a single kanban column: a title header plus its stack of job cards.
// also acts as a drop target so cards can be dragged in from other columns.
function KanbanColumn({ title, jobs, onCardClick, onEditClick, onDropJob }) {
  const [isDragOver, setIsDragOver] = useState(false)

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

      <div className="flex flex-col gap-3 min-h-[60px]">
        {jobs.map((job) => (
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
