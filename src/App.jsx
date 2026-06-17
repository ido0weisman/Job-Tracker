import { CircleHelp, Moon, Plus, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import * as jobsApi from './api/jobs'
import { FINAL_STATUS, NEXT_STEP_STATUSES } from './constants'
import AddJobModal from './components/AddJobModal'
import HelpModal from './components/HelpModal'
import JobDetailModal from './components/JobDetailModal'
import JobShowcaseModal from './components/JobShowcaseModal'
import KanbanBoard from './components/KanbanBoard'
import { useTheme } from './hooks/useTheme'

function App() {
  const [jobs, setJobs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showcaseJobId, setShowcaseJobId] = useState(null)
  const [editJobId, setEditJobId] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const showcaseJob = jobs.find((job) => job.id === showcaseJobId) ?? null
  const editJob = jobs.find((job) => job.id === editJobId) ?? null

  // load jobs from supabase once on mount
  useEffect(() => {
    jobsApi
      .fetchJobs()
      .then(setJobs)
      .catch((fetchError) => setError(fetchError.message))
      .finally(() => setIsLoading(false))
  }, [])

  async function addJob(formData) {
    try {
      const newJob = await jobsApi.createJob({
        ...formData,
        status: 'Wishlist',
        dynamic_fields: [],
      })
      setJobs((current) => [...current, newJob])
    } catch (saveError) {
      setError(saveError.message)
    }
  }

  async function updateJob(id, changes) {
    // update the UI immediately, then persist; keeps editing feeling instant
    setJobs((current) =>
      current.map((job) => (job.id === id ? { ...job, ...changes } : job)),
    )

    try {
      await jobsApi.updateJob(id, changes)
    } catch (saveError) {
      setError(saveError.message)
    }
  }

  async function deleteJob(id) {
    try {
      await jobsApi.deleteJob(id)
      setJobs((current) => current.filter((job) => job.id !== id))
    } catch (deleteError) {
      setError(deleteError.message)
    }
  }

  // jump from the read-only showcase view straight into editing the same job
  function switchToEdit(id) {
    setShowcaseJobId(null)
    setEditJobId(id)
  }

  // called when a card is dropped onto a column - moves it to that stage.
  // leaving an active stage means there's no "next step" anymore, and
  // leaving the final stage means there's no outcome anymore.
  function moveJobToStatus(jobId, status) {
    const job = jobs.find((current) => current.id === jobId)
    if (!job || job.status === status) return

    const changes = { status }
    if (!NEXT_STEP_STATUSES.includes(status)) changes.next_step_date = null
    if (status !== FINAL_STATUS) changes.outcome = null
    updateJob(jobId, changes)
  }

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-lg font-semibold">Job Application Tracker</h1>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsHelpModalOpen(true)}
            aria-label="How it works"
            className="flex items-center justify-center rounded-md p-2 text-slate-600 dark:text-slate-300
              hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <CircleHelp size={18} />
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="flex items-center justify-center rounded-md p-2 text-slate-600 dark:text-slate-300
              hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 bg-red-200 dark:bg-amber-200 text-slate-800 text-sm
              font-medium rounded-md px-3 py-1.5 hover:brightness-95 transition-all"
          >
            <Plus size={16} />
            Add Job
          </button>
        </div>
      </header>

      {error && (
        <div className="px-6 py-2 bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 text-sm">
          {error}
        </div>
      )}

      <main className="px-6 py-6">
        {isLoading ? (
          <p className="text-slate-500 dark:text-slate-400 text-sm">Loading jobs...</p>
        ) : (
          <KanbanBoard
            jobs={jobs}
            onCardClick={setShowcaseJobId}
            onEditClick={setEditJobId}
            onDropJob={moveJobToStatus}
          />
        )}
      </main>

      {isAddModalOpen && (
        <AddJobModal onClose={() => setIsAddModalOpen(false)} onAdd={addJob} />
      )}

      {isHelpModalOpen && <HelpModal onClose={() => setIsHelpModalOpen(false)} />}

      {showcaseJob && (
        <JobShowcaseModal
          job={showcaseJob}
          onClose={() => setShowcaseJobId(null)}
          onEditClick={() => switchToEdit(showcaseJob.id)}
        />
      )}

      {editJob && (
        <JobDetailModal
          job={editJob}
          onClose={() => setEditJobId(null)}
          onUpdate={updateJob}
          onDelete={deleteJob}
        />
      )}
    </div>
  )
}

export default App
