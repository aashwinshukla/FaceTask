import { useState } from 'react'
import toast from 'react-hot-toast'
import { useBoard } from '../context/BoardContext'
import Column from '../components/board/Column'
import TaskModal from '../components/board/TaskModal'

const COLUMNS = ['todo', 'in-progress', 'done']

function Board() {
  const { tasks, addTask } = useBoard()
  const [quickAdd, setQuickAdd] = useState(false)

  function handleQuickAdd(data) {
    addTask(data)
    setQuickAdd(false)
    toast.success('Task added')
  }

  return (
    <div className="flex-1 flex flex-col p-6 gap-6">

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
            Board
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
            {tasks.length} task{tasks.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <button
          onClick={() => setQuickAdd(true)}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
          style={{
            backgroundColor: 'var(--color-accent)',
            color: '#fff',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          + New Task
        </button>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-3 gap-5 flex-1" style={{ alignItems: 'start' }}>
        {COLUMNS.map(status => (
          <Column key={status} status={status} filteredTasks={tasks} />
        ))}
      </div>

      {/* Quick-add modal from "New Task" button */}
      {quickAdd && (
        <TaskModal onSave={handleQuickAdd} onClose={() => setQuickAdd(false)} />
      )}
    </div>
  )
}

export default Board
