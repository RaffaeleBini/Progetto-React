// useState salva i dati dinamici dell'app.
// useMemo evita di ricreare inutilmente l'oggetto condiviso del context.
import { useMemo, useState } from 'react'
// Importiamo il contenitore condiviso creato in un file separato.
import { RecipesContext } from './recipes-context'
// Questa funzione effettua la chiamata HTTP verso Spoonacular.
import { searchVegetarianRecipes } from '../services/spoonacular'

export function RecipesProvider({ children }) {
  // Array con le ricette trovate.
  const [recipes, setRecipes] = useState([])
  // Testo cercato dall'utente.
  const [searchTerm, setSearchTerm] = useState('')
  // true mentre l'app aspetta la risposta dell'API.
  const [isLoading, setIsLoading] = useState(false)
  // Messaggio di errore da mostrare all'utente.
  const [error, setError] = useState('')
  // Indica se l'utente ha gia effettuato almeno una ricerca.
  const [hasSearched, setHasSearched] = useState(false)

  async function performSearch(rawTerm) {
    // trim() rimuove gli spazi inutili a inizio e fine testo.
    const normalizedTerm = rawTerm.trim()

    // Salviamo il termine usato per la ricerca.
    setSearchTerm(normalizedTerm)
    // Da questo momento in poi sappiamo che una ricerca e stata avviata.
    setHasSearched(true)

    if (!normalizedTerm) {
      // Se il campo e vuoto, svuotiamo i risultati e mostriamo un avviso.
      setRecipes([])
      setError('Please insert a vegetarian ingredient or dish.')
      return
    }

    try {
      // Attiviamo il loading prima della richiesta.
      setIsLoading(true)
      // Puliamo eventuali errori precedenti.
      setError('')
      // Richiediamo le ricette vegetariane all'API.
      const data = await searchVegetarianRecipes(normalizedTerm)
      // results contiene la lista di ricette restituita da Spoonacular.
      setRecipes(data.results ?? [])

      if (!data.results?.length) {
        // La richiesta e andata a buon fine, ma non ci sono risultati utili.
        setError('No recipe found. Try a different search.')
      }
    } catch (requestError) {
      // In caso di errore azzeriamo le ricette e mostriamo il messaggio corrispondente.
      setRecipes([])
      setError(requestError.message)
    } finally {
      // finally viene eseguito sempre, sia in successo sia in errore.
      setIsLoading(false)
    }
  }

  // Questo oggetto contiene tutti i valori condivisi con il resto dell'app.
  const value = useMemo(
    () => ({
      error,
      hasSearched,
      isLoading,
      performSearch,
      recipes,
      searchTerm,
      setError,
    }),
    [error, hasSearched, isLoading, recipes, searchTerm],
  )

  return (
    // Tutti i componenti figli potranno leggere questi dati tramite useRecipes.
    <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>
  )
}
