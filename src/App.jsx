// Questi componenti di React Router ci permettono di definire le pagine dell'app.
import { Navigate, Route, Routes } from 'react-router-dom'
// Layout contiene l'intestazione comune e il punto in cui cambiano le pagine.
import Layout from './components/Layout'
// HomePage mostra ricerca e risultati.
import HomePage from './pages/HomePage'
// NotFoundPage viene mostrata quando l'URL non esiste.
import NotFoundPage from './pages/NotFoundPage'
// RecipeDetailPage mostra i dettagli di una ricetta specifica.
import RecipeDetailPage from './pages/RecipeDetailPage'

function App() {
  return (
    // Routes legge l'URL e decide quale pagina mostrare.
    <Routes>
      {/* Questo Route applica il Layout a tutte le pagine figlie. */}
      <Route element={<Layout />}>
        {/* "index" corrisponde alla home page: "/" */}
        <Route index element={<HomePage />} />
        {/* ":id" e un parametro dinamico che identifica la ricetta scelta. */}
        <Route path="recipe/:id" element={<RecipeDetailPage />} />
        {/* Pagina dedicata agli URL non validi. */}
        <Route path="404" element={<NotFoundPage />} />
        {/* Qualunque altro percorso viene reindirizzato alla 404. */}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  )
}

export default App
