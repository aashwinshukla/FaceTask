import { useBoard } from '../context/BoardContext'

function StatCard({ label, value, accent, icon }) {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-3"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div className="flex items-start justify-between">
        <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
          {label}
        </span>
        {icon && (
          <span
            className="text-lg w-9 h-9 flex items-center justify-center rounded-xl"
            style={{ backgroundColor: accent ? accent + '22' : 'var(--color-surface-raised)' }}
          >
            {icon}
          </span>
        )}
      </div>
      <span
        className="text-4xl font-bold tracking-tight"
        style={{ color: accent ?? 'var(--color-text)' }}
      >
        {value}
      </span>
    </div>
  )
}

function BarRow({ label, value, max, color }) {
  const pct = max === 0 ? 0 : Math.round((value / max) * 100)
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
          {label}
        </span>
        <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
          {value}
        </span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-surface-raised)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

function SectionTitle({ children }) {
  return (
    <h2
      className="text-xs font-semibold uppercase tracking-widest mb-4"
      style={{ color: 'var(--color-text-muted)' }}
    >
      {children}
    </h2>
  )
}

function Dashboard() {
  const { tasks } = useBoard()

  const total      = tasks.length
  const todo       = tasks.filter(t => t.status === 'todo').length
  const inProgress = tasks.filter(t => t.status === 'in-progress').length
  const done       = tasks.filter(t => t.status === 'done').length
  const low        = tasks.filter(t => t.priority === 'low').length
  const medium     = tasks.filter(t => t.priority === 'medium').length
  const high       = tasks.filter(t => t.priority === 'high').length

  const overdue = tasks.filter(t => {
    if (!t.dueDate || t.status === 'done') return false
    return new Date(t.dueDate) < new Date(new Date().toDateString())
  }).length

  const completionPct = total === 0 ? 0 : Math.round((done / total) * 100)

  return (
    <div className="flex-1 p-6 flex flex-col gap-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
          Dashboard
        </h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
          Overview of your task board
        </p>
      </div>

      {/* Overview stat cards */}
      <section>
        <SectionTitle>Overview</SectionTitle>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Tasks"  value={total}             icon="📋" />
          <StatCard label="Completion"   value={`${completionPct}%`} accent="var(--color-accent)" icon="🎯" />
          <StatCard label="In Progress"  value={inProgress}        accent="var(--color-warning)" icon="⚡" />
          <StatCard label="Overdue"      value={overdue}           accent="var(--color-danger)"  icon="⚠️" />
        </div>
      </section>

      {/* Breakdown panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section
          className="rounded-2xl p-6"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <SectionTitle>By Column</SectionTitle>
          <div className="flex flex-col gap-4">
            <BarRow label="To Do"       value={todo}       max={total} color="var(--color-accent)" />
            <BarRow label="In Progress" value={inProgress} max={total} color="var(--color-warning)" />
            <BarRow label="Done"        value={done}       max={total} color="var(--color-success)" />
          </div>
        </section>

        <section
          className="rounded-2xl p-6"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <SectionTitle>By Priority</SectionTitle>
          <div className="flex flex-col gap-4">
            <BarRow label="High"   value={high}   max={total} color="var(--color-danger)" />
            <BarRow label="Medium" value={medium} max={total} color="var(--color-warning)" />
            <BarRow label="Low"    value={low}    max={total} color="var(--color-success)" />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard
