import React from 'react'
import { Link, Outlet, createRootRoute, createRoute, createRouter } from '@tanstack/react-router'

const pages = [
  { path: '/', label: 'Home', file: 'index.html' },
  { path: '/login', label: 'Login', file: 'login.html' },
  { path: '/dashboard', label: 'Dashboard', file: 'dashboard.html' },
  { path: '/todo', label: 'Todo', file: 'todo.html' },
  { path: '/timer', label: 'Timer', file: 'timer.html' },
  { path: '/scores', label: 'Scores', file: 'scores.html' },
  { path: '/calculators', label: 'Calculators', file: 'calculators.html' },
  { path: '/reports', label: 'Reports', file: 'reports.html' },
  { path: '/knowledge', label: 'Knowledge', file: 'knowledge.html' },
]

function LegacyPage({ file }) {
  return (
    <iframe
      className="legacy-frame"
      src={`/legacy/${file}`}
      title={file}
      sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
    />
  )
}

const rootRoute = createRootRoute({
  component: () => (
    <div className="app-shell">
      <header>
        <h1>Medora (TanStack Router)</h1>
        <nav>
          {pages.map((page) => (
            <Link key={page.path} to={page.path} className="nav-link" activeProps={{ className: 'nav-link active' }}>
              {page.label}
            </Link>
          ))}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  ),
})

const routes = pages.map((page) =>
  createRoute({
    getParentRoute: () => rootRoute,
    path: page.path === '/' ? '/' : page.path,
    component: () => <LegacyPage file={page.file} />,
  }),
)

const routeTree = rootRoute.addChildren(routes)

export const router = createRouter({ routeTree })
