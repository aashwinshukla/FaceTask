import { useEffect, useState } from 'react'
import TaskModal from '../components/board/TaskModal'
import { useBoard } from '../context/BoardContext'
import toast from 'react-hot-toast'


function Board() {
  const { addTask } = useBoard()
  const { filtered } = useFilters()
  const [quickAdd, setQuickAdd] = useState(false)

  useEffect(() => {
    function onKey(e) {
      
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.key === 'n' || e.key === 'N') setQuickAdd(true)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function handleQuickAdd(data) {
    addTask(data)
    setQuickAdd(false)
    toast.success('Task added')
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Board</h1>
        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          Press <kbd style={{ backgroundColor: 'var(--color-surface-raised)', padding: '2px 6px', borderRadius: '4px' }}>N</kbd> to add task
        </span>
      </div>
      <FilterBar />
      <div className="flex gap-4 overflow-x-auto pb-4">
        {COLUMNS.map(status => (
          <Column key={status} status={status} filteredTasks={filtered} />
        ))}
      </div>
      {quickAdd && (
        <TaskModal onSave={handleQuickAdd} onClose={() => setQuickAdd(false)} />
      )}
    </div>
  )
}