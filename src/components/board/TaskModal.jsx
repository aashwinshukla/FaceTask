import { useEffect, useRef, useState } from 'react'

const PRIORITIES = ['low', 'medium', 'high']
const STATUSES = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
]

// task = existing task object (edit mode) or null (add mode)
// defaultStatus = which column the + button was clicked from
// onSave(data) = called with form data when user submits
// onClose() = called when user cancels or clicks backdrop
function TaskModal({ task = null, defaultStatus = 'todo', onSave, onClose }) {
  const isEdit = task !== null

  const [title, setTitle] = useState(task?.title ?? '')
  const [description, setDescription] = useState(task?.description ?? '')
  const [priority, setPriority] = useState(task?.priority ?? 'medium')
  const [status, setStatus] = useState(task?.status ?? defaultStatus)
  const [dueDate, setDueDate] = useState(task?.dueDate ?? '')

  const titleRef = useRef(null)

  // Focus title input when modal opens
  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  // Close on Escape key
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return
    onSave({
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      dueDate: dueDate || null,
    })
  }

  const inputStyle = {
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text)',
    borderRadius: '0.5rem',
    padding: '0.5rem 0.75rem',
    width: '100%',
    outline: 'none',
  }

  const labelStyle = {
    display: 'block',
    marginBottom: '0.375rem',
    fontSize: '0.875rem',
    color: 'var(--color-text-muted)',
  }

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      {/* Modal box — stop click from bubbling to backdrop */}
      <div
        className="w-full max-w-md rounded-xl p-6 shadow-2xl"
        style={{ backgroundColor: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-5" style={{ color: 'var(--color-text)' }}>
          {isEdit ? 'Edit Task' : 'New Task'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title */}
          <div>
            <label style={labelStyle}>Title *</label>
            <input
              ref={titleRef}
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              style={inputStyle}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label style={labelStyle}>Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Optional details..."
              rows={3}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          {/* Priority + Status — side by side */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label style={labelStyle}>Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)} style={inputStyle}>
                {PRIORITIES.map(p => (
                  <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label style={labelStyle}>Column</label>
              <select value={status} onChange={e => setStatus(e.target.value)} style={inputStyle}>
                {STATUSES.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label style={labelStyle}>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              style={{ ...inputStyle, colorScheme: 'dark' }}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
              style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text-muted)' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-80 transition-opacity"
              style={{ backgroundColor: 'var(--color-accent)', color: '#fff' }}
            >
              {isEdit ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskModal