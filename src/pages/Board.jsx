import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { DndContext, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core'
import { useBoard } from '../context/BoardContext'
import { useFilters } from '../hooks/useFilters'
import Column from '../components/board/Column'
import FilterBar from '../components/board/FilterBar'
import TaskModal from '../components/board/TaskModal'
import TaskCard from '../components/board/TaskCard'

const COLUMNS = ['todo', 'in-progress', 'done']

function Board() {
  const { addTask, tasks, moveTask } = useBoard()
  const { filtered } = useFilters()
  const [quickAdd, setQuickAdd]   = useState(false)
  const [activeTask, setActiveTask] = useState(null)   // task being dragged

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  useEffect(() => {
    function onKey(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.key === 'n' || e.key === 'N') setQuickAdd(true)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function handleDragStart(event) {
    const task = tasks.find(t => t.id === event.active.id)
    setActiveTask(task ?? null)
  }

  function handleDragEnd(event) {
    const { active, over } = event
    setActiveTask(null)
    if (!over) return
    // `over.id` is the column status string (set as droppable id in Column)
    const newStatus = over.id
    const task = tasks.find(t => t.id === active.id)
    if (task && task.status !== newStatus) {
      moveTask(task.id, newStatus)
      toast.success(`Moved to ${newStatus}`)
    }
  }

  function handleQuickAdd(data) {
    addTask(data)
    setQuickAdd(false)
    toast.success('Task added')
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex-1 flex flex-col p-6 gap-6">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Board</h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
              {tasks.length} task{tasks.length !== 1 ? 's' : ''} &nbsp;·&nbsp;
              Press <kbd style={{ backgroundColor: 'var(--color-surface-raised)', padding: '1px 5px', borderRadius: '4px', fontSize: '0.75rem' }}>N</kbd> to add
            </p>
          </div>
          <button
            onClick={() => setQuickAdd(true)}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: 'var(--color-accent)', color: '#fff', boxShadow: 'var(--shadow-sm)' }}
          >
            + New Task
          </button>
        </div>

        <FilterBar />

        <div className="grid grid-cols-3 gap-5 flex-1" style={{ alignItems: 'start' }}>
          {COLUMNS.map(status => (
            <Column key={status} status={status} filteredTasks={filtered} />
          ))}
        </div>

        {/* Ghost card shown while dragging */}
        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} isDragging /> : null}
        </DragOverlay>
      </div>

      {quickAdd && (
        <TaskModal onSave={handleQuickAdd} onClose={() => setQuickAdd(false)} />
      )}
    </DndContext>
  )
}

export default Board