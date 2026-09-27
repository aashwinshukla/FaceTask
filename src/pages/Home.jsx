import { Link } from 'react-router-dom'
import logo from '../assets/org-home-logo-facetask.png'

function Home() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 py-24 px-6 text-center">
      <img src={logo} alt="FaceTask" className="h-16 w-auto mb-8 opacity-90" />
      <h1
        className="text-4xl font-bold mb-4 tracking-tight"
        style={{ color: 'var(--color-text)' }}
      >
        Manage your tasks, visually.
      </h1>
      <p
        className="text-lg mb-10 max-w-md leading-relaxed"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        FaceTask is a Kanban-style task board. Add tasks, move them across
        columns, and stay on top of everything.
      </p>
      <Link
        to="/board"
        className="px-7 py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
        style={{
          backgroundColor: 'var(--color-accent)',
          color: '#fff',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        Go to Board →
      </Link>
    </div>
  )
}

export default Home
