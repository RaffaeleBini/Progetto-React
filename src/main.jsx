// Importiamo StrictMode per ricevere avvisi utili durante lo sviluppo.
import { StrictMode } from 'react'
// createRoot collega React al div "root" presente nel file index.html.
import { createRoot } from 'react-dom/client'
// BrowserRouter abilita la navigazione tra pagine senza ricaricare il sito.
import { BrowserRouter } from 'react-router-dom'
// App contiene il sistema di routing principale dell'applicazione.
import App from './App'
// RecipesProvider rende disponibile lo stato globale a tutti i componenti figli.
import { RecipesProvider } from './context/RecipesContext'
// Qui importiamo gli stili globali dell'intera applicazione.
import './index.css'

// Con questa istruzione diciamo a React: "renderizza tutta l'app dentro #root".
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter gestisce il passaggio tra home, dettaglio e 404. */}
    {/* basename dice al router che l'app vive sotto /Progetto-React/ su GitHub Pages. */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      {/* RecipesProvider condivide risultati, loading, errori e ricerca. */}
      <RecipesProvider>
        <App />
      </RecipesProvider>
    </BrowserRouter>
  </StrictMode>,
)
