import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { RecipesProvider } from './context/RecipesContext'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* basename allinea il router al path /Progetto-React/ usato da GitHub Pages. */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <RecipesProvider>
        <App />
      </RecipesProvider>
    </BrowserRouter>
  </StrictMode>,
)
