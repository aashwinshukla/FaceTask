import { useState } from 'react'
import toast from 'react-hot-toast'
import { useBoard } from '../../context/BoardContext'
import TaskModal from './TaskModal'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

const PRIORITY_COLORS = {
  low:    { bg: '#dcfce7', text: '#15803d' },
  medium: { bg: '#fef9c3', text: '#a16207' },
  high:   { bg: '#fee2e2', text: '#dc2626' },
}

function isOverdue(dueDate, status) {
  if (!dueDate || status === 'done') return false
  return new Date(dueDate) < new Date(new Date().toDateString())
}

function TaskCard({ task }) {
  const { editTask, deleteTask, restoreTask } = useBoard()
  const [editing, setEditing] = useState(false)

  const pc = PRIORITY_COLORS[task.priority]
  const overdue = isOverdue(task.dueDate, task.status)

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: task.id })

  const dragStyle = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
  }

  function handleEdit(data) {
    editTask(task.id, data)
    setEditing(false)
    toast.success('Task updated')
  }

  function handleDelete() {
    const deleted = deleteTask(task.id)
    toast(
      t => (
        <span>
          Task deleted.{' '}
          <button
            onClick={() => {
              restoreTask(deleted)
              toast.dismiss(t.id)
            }}
            style={{ color: 'var(--color-accent)', fontWeight: 600 }}
          >
            Undo
          </button>
        </span>
      ),
      { duration: 4000 }
    )
  }

  return (
    <>
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className="rounded-xl p-4 flex flex-col gap-2 group cursor-pointer transition-shadow hover:shadow-md"
        style={{
          ...dragStyle,
          backgroundColor: 'var(--color-surface)',
          border: `1px solid ${overdue ? 'var(--color-danger)' : 'var(--color-border)'}`,
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {/* Title */}
        <p className="text-sm font-medium leading-snug" style={{ color: 'var(--color-text)' }}>
          {task.title}
        </p>

        {/* Description preview */}
        {task.description && (
          <p className="text-xs line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>
            {task.description}
          </p>
        )}

        {/* Priority badge */}
        <div className="flex items-center justify-between gap-2">
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ backgroundColor: pc.bg, color: pc.text }}
          >
            {task.priority}
          </span>

          {/* Due date */}
          {task.dueDate && (
            <span
              className="text-xs"
              style={{ color: overdue ? 'var(--color-danger)' : 'var(--color-text-muted)' }}
            >
              {overdue ? '⚠ Overdue · ' : '📅 '}
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>

        {/* Action buttons — visible on hover */}
        <div className="flex gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setEditing(true)
            }}
            className="text-xs px-3 py-1 rounded-lg hover:opacity-80 transition-opacity"
            style={{
              backgroundColor: 'var(--color-surface-raised)',
              color: 'var(--color-text-secondary)',
              border: '1px solid var(--color-border)',
            }}
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleDelete()
            }}
            className="text-xs px-3 py-1 rounded-lg hover:opacity-80 transition-opacity"
            style={{
              backgroundColor: 'var(--color-danger-light)',
              color: 'var(--color-danger)',
              border: '1px solid var(--color-danger)',
            }}
          >
            Delete
          </button>
        </div>
      </div>

      {editing && (
        <TaskModal task={task} onSave={handleEdit} onClose={() => setEditing(false)} />
      )}
    </>
  )
}

export default TaskCard