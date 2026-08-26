import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'modern-normalize'
import { Toaster } from 'react-hot-toast'
import './global.css'
import './index.css'
import App from './components/App/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster position="top-center" />
  </StrictMode>,
)
