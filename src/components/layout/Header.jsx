import { NavLink } from 'react-router-dom'
import logo from '../../assets/org-facetask.png'

function Header() {
  return (
    <header
      className="sticky top-0 z-40 px-8 py-3 flex items-center justify-between"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {/* Logo */}
      <NavLink to="/" className="flex items-center">
        <img
          src={logo}
          alt="FaceTask"
          className="h-10 w-auto object-contain"
        />
      </NavLink>

      {/* Nav */}
      <nav className="flex items-center gap-1">
        {[
          { to: '/board', label: 'Board' },
          { to: '/dashboard', label: 'Dashboard' },
        ].map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={({ isActive }) => ({
              color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
              backgroundColor: isActive ? 'var(--color-accent-light)' : 'transparent',
            })}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default Header
