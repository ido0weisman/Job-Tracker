import { COLUMNS } from '../constants'
import KanbanColumn from './KanbanColumn'

// renders one KanbanColumn per fixed pipeline stage, filtering jobs by status
function KanbanBoard({ jobs, onCardClick, onEditClick, onDropJob }) {
  return (
    <div className="grid grid-cols-5 gap-4 pb-4">
      {COLUMNS.map((column) => (
        <KanbanColumn
          key={column}
          title={column}
          jobs={jobs.filter((job) => job.status === column)}
          onCardClick={onCardClick}
          onEditClick={onEditClick}
          onDropJob={onDropJob}
        />
      ))}
    </div>
  )
}

export default KanbanBoard
