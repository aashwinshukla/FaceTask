import { useState } from 'react'
import toast from 'react-hot-toast'
import { useBoard } from '../../context/BoardContext'
import TaskCard from './TaskCard'
import TaskModal from './TaskModal'

const COLUMN_META = {
  'todo':        { label: 'To Do',       color: 'var(--color-accent)' },
  'in-progress': { label: 'In Progress', color: 'var(--color-warning)' },
  'done':        { label: 'Done',        color: 'var(--color-success)' },
}

function Column({ status, filteredTasks }) {
  const { addTask } = useBoard()
  const [adding, setAdding] = useState(false)

  const { label, color } = COLUMN_META[status]
  const tasks = filteredTasks.filter(t => t.status === status)

  function handleAdd(data) {
    addTask(data)
    setAdding(false)
    toast.success('Task added')
  }

  return (
    <>
      <div
        className="flex flex-col rounded-2xl flex-1 min-w-0"
        style={{
          backgroundColor: 'var(--color-surface-raised)',
          border: '1px solid var(--color-border)',
          minHeight: '480px',
        }}
      >
        {/* Column header */}
        <div
          className="px-5 py-4 flex items-center justify-between rounded-t-2xl"
          style={{ borderBottom: '1px solid var(--color-border)' }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
            <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>
              {label}
            </h3>
          </div>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text-muted)' }}
          >
            {tasks.length}
          </span>
        </div>

        {/* Task cards */}
        <div className="flex flex-col gap-3 p-4 flex-1">
          {tasks.length === 0 && (
            <div
              className="flex-1 flex items-center justify-center rounded-xl border-2 border-dashed"
              style={{ borderColor: 'var(--color-border)', minHeight: '120px' }}
            >
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                No tasks
              </p>
            </div>
          )}
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

        {/* Add task button */}
        <div className="px-4 pb-4">
          <button
            onClick={() => setAdding(true)}
            className="w-full py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
            style={{
              border: '1.5px dashed var(--color-border-strong)',
              color: 'var(--color-text-muted)',
              backgroundColor: 'transparent',
            }}
          >
            + Add task
          </button>
        </div>
      </div>

      {adding && (
        <TaskModal defaultStatus={status} onSave={handleAdd} onClose={() => setAdding(false)} />
      )}
    </>
  )
}

export default Column
