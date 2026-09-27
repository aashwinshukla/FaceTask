import { useState, useEffect, useContext, createContext } from 'react'

const BoardContext = createContext(null)

const COLUMNS = ['todo', 'in-progress', 'done']
const STORAGE_KEY = 'facetask-board'

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function BoardProvider({ children }) {
  const [tasks, setTasks] = useState(loadFromStorage)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  function addTask(taskData) {
    const newTask = {
      id: crypto.randomUUID(),
      title: taskData.title,
      description: taskData.description || '',
      priority: taskData.priority || 'medium',
      status: taskData.status || 'todo',
      dueDate: taskData.dueDate || null,
      createdAt: new Date().toISOString(),
    }
    setTasks(prev => [...prev, newTask])
  }

  function editTask(id, update) {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, ...update } : task))
    )
  }

  function deleteTask(id) {
    let deleted = null
    setTasks(prev => {
      deleted = prev.find(t => t.id === id)
      return prev.filter(t => t.id !== id)
    })
    return deleted
  }

  function restoreTask(task) {
    setTasks(prev => [...prev, task])
  }

  function moveTask(id, newStatus) {
    editTask(id, { status: newStatus })
  }

  function getTasksByStatus(status) {
    return tasks.filter(t => t.status === status)
  }

  return (
    <BoardContext.Provider
      value={{ tasks, COLUMNS, addTask, editTask, deleteTask, restoreTask, moveTask, getTasksByStatus }}
    >
      {children}
    </BoardContext.Provider>
  )
}

export function useBoard() {
  const ctx = useContext(BoardContext)
  if (!ctx) throw new Error('useBoard must be used inside BoardProvider')
  return ctx
}
