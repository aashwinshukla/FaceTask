import { useBoard } from '../context/BoardContext'

function StatCard({ label, value, color }) {
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-1"
      style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
    >
      <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{label}</span>
      <span className="text-3xl font-bold" style={{ color: color ?? 'var(--color-text)' }}>
        {value}
      </span>
    </div>
  )
}

function Dashboard() {
  const { tasks } = useBoard()

  const todo = tasks.filter(t => t.status === 'todo').length
  const inProgress = tasks.filter(t => t.status === 'in-progress').length
  const done = tasks.filter(t => t.status === 'done').length
  const low = tasks.filter(t => t.priority === 'low').length
  const medium = tasks.filter(t => t.priority === 'medium').length
  const high = tasks.filter(t => t.priority === 'high').length
  const overdue = tasks.filter(t => {
    if (!t.dueDate || t.status === 'done') return false
    return new Date(t.dueDate) < new Date(new Date().toDateString())
  }).length

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
        Dashboard
      </h1>

      <h2 className="text-sm font-semibold mb-3 uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
        Overview
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Tasks" value={tasks.length} />
        <StatCard label="Overdue" value={overdue} color="var(--color-danger)" />
      </div>

      <h2 className="text-sm font-semibold mb-3 uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
        By Column
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <StatCard label="To Do" value={todo} />
        <StatCard label="In Progress" value={inProgress} color="var(--color-accent)" />
        <StatCard label="Done" value={done} color="var(--color-success)" />
      </div>

      <h2 className="text-sm font-semibold mb-3 uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
        By Priority
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard label="Low" value={low} color="#22c55e" />
        <StatCard label="Medium" value={medium} color="#f59e0b" />
        <StatCard label="High" value={high} color="var(--color-danger)" />
      </div>
    </div>
  )
}

export default Dashboard