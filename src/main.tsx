import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppShell } from './components/AppShell'
import { HomePage } from './pages/HomePage'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppShell>
      <HomePage />
    </AppShell>
  </StrictMode>,
)
