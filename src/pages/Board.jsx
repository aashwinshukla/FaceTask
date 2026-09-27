import { useFilters } from '../hooks/useFilters'
import Column from '../components/board/Column'
import FilterBar from '../components/board/FilterBar'

const COLUMNS = ['todo', 'in-progress', 'done']

function Board() {
  const { filtered } = useFilters()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
        Board
      </h1>
      <FilterBar />
      <div className="flex gap-4 overflow-x-auto pb-4">
        {COLUMNS.map(status => (
          <Column key={status} status={status} filteredTasks={filtered} />
        ))}
      </div>
    </div>
  )
}

export default Board