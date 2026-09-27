import { useFilters } from '../../hooks/useFilters'

const inputStyle = {
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  color: 'var(--color-text)',
  borderRadius: '0.5rem',
  padding: '0.4rem 0.75rem',
  fontSize: '0.875rem',
  outline: 'none',
}

function FilterBar() {
  const { search, priority, status, hasFilters, setFilter, clearFilters } = useFilters()

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={e => setFilter('q', e.target.value)}
        style={{ ...inputStyle, minWidth: '200px' }}
      />

      <select
        value={priority}
        onChange={e => setFilter('priority', e.target.value)}
        style={inputStyle}
      >
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <select
        value={status}
        onChange={e => setFilter('status', e.target.value)}
        style={inputStyle}
      >
        <option value="">All Columns</option>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      {hasFilters && (
        <button
          onClick={clearFilters}
          className="text-sm px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity"
          style={{ backgroundColor: 'var(--color-surface-raised)', color: 'var(--color-text-muted)' }}
        >
          Clear
        </button>
      )}
    </div>
  )
}

export default FilterBar