# FaceTask

A drag-and-drop Kanban task board built with React — plan, organize, track, and analyze your tasks across To Do, In Progress, and Done columns.

🔗 **Live Demo:** (https://face-task.vercel.app/)
📂 **Repo:** https://github.com/aashwinshukla/FaceTask

---

## Features

- **Drag-and-drop task management** — move tasks between columns (To Do → In Progress → Done) with smooth, real drag interactions
- **Full task details** — title, description, priority level, and due date per task
- **Add, edit, and delete tasks** — with an **undo-delete** option, so a mistaken delete isn't permanent
- **Filtering & search** — filter by priority/column and search tasks directly from the board
- **Analytics Dashboard** — a dedicated overview page showing total tasks, completion percentage, tasks in progress, overdue count, and breakdowns by column and by priority
- **Persistent storage** — your board is saved to `localStorage`, so it's exactly as you left it on your next visit
- **Toast notifications** for actions (via `react-hot-toast`)
- **Keyboard shortcut** — press `N` to quickly add a new task
- **Multi-page structure** — Home, Board, and Dashboard views via React Router
- **Fully responsive**, clean UI with a consistent visual identity (custom logo, color-coded priority tags and status indicators) styled with Tailwind CSS

---

## Tech Stack

- **React 19** + **Vite**
- **@dnd-kit** (core + sortable) — drag-and-drop functionality
- **React Router** — client-side routing
- **React Context + custom hooks** — global board state (`BoardContext`) and filtering logic (`useFilters`)
- **react-hot-toast** — notifications
- **Tailwind CSS** — styling

---

## What This Project Taught Me

This was my second frontend project, built right after a search/API-driven app, specifically to learn a different class of problem:

- **"Lifting state up"** and centralizing shared state through React Context — the board's task data lives in one place (`BoardContext`) and every component (columns, cards, modals, filters, dashboard) reads and updates through it
- **Real drag-and-drop mechanics** using `@dnd-kit`, including how to update state correctly when a drag-drop event fires
- Structuring **immutable state updates** for a more complex data model (tasks with multiple fields, filtered and grouped by status)
- Building a **custom hook** (`useFilters`) to keep filtering logic out of the UI components
- **Deriving analytics from live state** — the Dashboard's numbers (completion %, per-column and per-priority breakdowns) are computed directly from the same task data driving the board, not separately tracked or hardcoded

---

## Running Locally

```bash
git clone https://github.com/aashwinshukla/FaceTask.git
cd FaceTask
npm install
npm run dev
```

---

## Note on AI Usage

Planning, some boilerplate scaffolding, and refinement were done with AI assistance — the same way many developers work today. All architecture decisions, state logic, drag-and-drop implementation, and the dashboard's analytics logic were built and understood by me directly.
