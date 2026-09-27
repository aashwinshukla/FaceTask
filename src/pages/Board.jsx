const COLUMNS = [
  { status: 'todo',        label: 'To Do',       color: '#6c63ff' },
  { status: 'in-progress', label: 'In Progress',  color: '#f59e0b' },
  { status: 'done',        label: 'Done',         color: '#22c55e' },
]

// Placeholder tasks until BoardContext is wired up
const DEMO_TASKS = [
  { id: '1', title: 'Design the board layout', priority: 'high',   status: 'todo',        dueDate: null },
  { id: '2', title: 'Set up routing',          priority: 'medium', status: 'in-progress', dueDate: null },
  { id: '3', title: 'Initialise project',      priority: 'low',    status: 'done',        dueDate: null },
]

const PRIORITY_COLORS = {
  low:    { bg: '#dcfce7', text: '#15803d' },
  medium: { bg: '#fef9c3', text: '#a16207' },
  high:   { bg: '#fee2e2', text: '#dc2626' },
}

function TaskCard({ task }) {
  const pc = PRIORITY_COLORS[task.priority]
  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-2 cursor-pointer hover:shadow-md transition-shadow"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <p className="text-sm font-medium leading-snug" style={{ color: 'var(--color-text)' }}>
        {task.title}
      </p>
      <span
        className="self-start text-xs px-2 py-0.5 rounded-full font-medium"
        style={{ backgroundColor: pc.bg, color: pc.text }}
      >
        {task.priority}
      </span>
    </div>
  )
}

function Column({ status, label, color }) {
  const tasks = DEMO_TASKS.filter(t => t.status === status)

  return (
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
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: color }}
          />
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

      {/* Cards */}
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

      {/* Add task */}
      <div className="px-4 pb-4">
        <button
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
  )
}

function Board() {
  return (
    <div
      className="flex-1 flex flex-col p-6 gap-6"
      style={{ minHeight: 0 }}
    >
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
            Board
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
            {DEMO_TASKS.length} tasks total
          </p>
        </div>
        <button
          className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'var(--color-accent)', color: '#fff', boxShadow: 'var(--shadow-sm)' }}
        >
          + New Task
        </button>
      </div>

      {/* Columns — equal width, fill available space */}
      <div className="grid grid-cols-3 gap-5 flex-1" style={{ alignItems: 'start' }}>
        {COLUMNS.map(col => (
          <Column key={col.status} {...col} />
        ))}
      </div>
    </div>
  )
}

export default Board
