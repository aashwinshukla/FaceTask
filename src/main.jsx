import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { BoardProvider } from './context/BoardContext.jsx'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <BoardProvider>
        <App />
        <Toaster position="bottom-right" />
      </BoardProvider>
    </BrowserRouter>
  </StrictMode>
)
