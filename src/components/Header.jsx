import { NavLink, Link } from "react-router-dom";

function Header(){
    return  <>
                <header
                style={{ backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}
                className="px-6 py-4 flex items-center justify-between"
                >
                    <Link to ="/" className="text-xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>
                        FaceTask
                    </Link>

                    <nav className="flex items-center gap-6">
                        <NavLink
                        to="/board"
                        style={({ isActive }) => ({ color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)' })}
                        className="text-sm font-medium hover:opacity-80 transition-opacity"
                        >
                            Board
                        </NavLink>
                        <NavLink
                        to="/dashboard"
                        style={({ isActive }) => ({ color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)' })}
                        className="text-sm font-medium hover:opacity-80 transition-opacity"
                        >
                            Dashboard
                        </NavLink>
                    </nav>                  
                </header>
            </>
}

export default Header