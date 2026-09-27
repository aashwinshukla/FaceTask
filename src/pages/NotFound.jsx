import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 py-24 text-center px-6">
      <h1
        className="text-8xl font-bold mb-4"
        style={{ color: 'var(--color-accent)' }}
      >
        404
      </h1>
      <p className="text-lg mb-8" style={{ color: 'var(--color-text-secondary)' }}>
        This page doesn't exist.
      </p>
      <Link
        to="/"
        className="px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-80 transition-opacity"
        style={{
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        ← Back to Home
      </Link>
    </div>
  )
}

export default NotFound
