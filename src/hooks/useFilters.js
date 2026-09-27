import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useBoard } from '../context/BoardContext'

export function useFilters() {
  const { tasks } = useBoard()
  const [params, setParams] = useSearchParams()

  const search   = params.get('q')        ?? ''
  const priority = params.get('priority') ?? ''
  const status   = params.get('status')   ?? ''

  function setFilter(key, value) {
    setParams(prev => {
      const next = new URLSearchParams(prev)
      if (value) { next.set(key, value) }
      else        { next.delete(key) }
      return next
    })
  }

  function clearFilters() {
    setParams({})
  }

  const filtered = useMemo(() => {
    return tasks.filter(task => {
      const matchSearch   = task.title.toLowerCase().includes(search.toLowerCase())
      const matchPriority = priority ? task.priority === priority : true
      const matchStatus   = status   ? task.status   === status   : true
      return matchSearch && matchPriority && matchStatus
    })
  }, [tasks, search, priority, status])

  const hasFilters = search || priority || status

  return { search, priority, status, filtered, hasFilters, setFilter, clearFilters }
}
