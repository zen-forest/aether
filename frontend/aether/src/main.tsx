import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import './index.css'
import { router } from './router.ts'
import { applyTheme } from './theme/applyTheme.ts'
import { defaultTheme } from './theme/themes.ts'

applyTheme(defaultTheme)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
