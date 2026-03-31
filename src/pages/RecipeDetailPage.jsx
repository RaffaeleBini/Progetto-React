// useEffect gestisce il caricamento dati quando cambia l'id della ricetta.
// useState salva ricetta, loading ed errori locali della pagina dettaglio.
import { useEffect, useState } from 'react'
// useParams legge l'id presente nell'URL.
// useNavigate permette di tornare indietro via codice.
// Link crea un collegamento interno verso la home.
import { Link, useNavigate, useParams } from 'react-router-dom'
import StatusMessage from '../components/StatusMessage'
// Questa funzione recupera i dettagli completi della singola ricetta.
import { getRecipeDetails } from '../services/spoonacular'

function RecipeDetailPage() {
  // id arriva dalla rotta /recipe/:id
  const { id } = useParams()
  const navigate = useNavigate()
  // recipe conterra l'oggetto completo ricevuto dall'API.
  const [recipe, setRecipe] = useState(null)
  // All'inizio la pagina e in caricamento.
  const [isLoading, setIsLoading] = useState(true)
  // Qui salviamo eventuali errori della richiesta.
  const [error, setError] = useState('')

  useEffect(() => {
    // Questa variabile evita di aggiornare lo stato se il componente viene smontato.
    let ignore = false

    async function loadRecipe() {
      try {
        setIsLoading(true)
        setError('')
        // Recuperiamo i dettagli della ricetta selezionata.
        const data = await getRecipeDetails(id)

        if (!ignore) {
          setRecipe(data)
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message)
        }
      } finally {
        if (!ignore) {
          // Quando la richiesta finisce, togliamo il loading.
          setIsLoading(false)
        }
      }
    }

    // Avviamo il caricamento appena la pagina viene aperta.
    loadRecipe()

    return () => {
      // Cleanup: segnaliamo che il componente non deve piu aggiornarsi.
      ignore = true
    }
  }, [id])

  // Primo caso: stiamo ancora aspettando i dati.
  if (isLoading) {
    return <StatusMessage>Caricamento della ricetta in corso...</StatusMessage>
  }

  // Secondo caso: la richiesta e fallita.
  if (error) {
    return <StatusMessage tone="error">{error}</StatusMessage>
  }

  // Terzo caso: non c'e una ricetta valida da mostrare.
  if (!recipe) {
    return (
      <StatusMessage tone="error">
        Ricetta non disponibile. Torna alla home e prova una nuova ricerca.
      </StatusMessage>
    )
  }

  return (
    // Se tutto va bene, mostriamo la pagina completa della ricetta.
    <article className="detail-page">
      <div className="detail-actions">
        {/* navigate(-1) prova a tornare alla pagina visitata in precedenza. */}
        <button type="button" className="ghost-button" onClick={() => navigate(-1)}>
          Torna indietro
        </button>
        {/* Link diretto alla home per fare una nuova ricerca. */}
        <Link to="/" className="ghost-button">
          Nuova ricerca
        </Link>
      </div>

      <section className="detail-hero">
        <img src={recipe.image} alt={`Foto di ${recipe.title}`} />
        <div className="detail-hero__content">
          <p className="section-kicker">Scheda ricetta</p>
          <h2>{recipe.title}</h2>
          <div className="detail-meta">
            {/* Mostriamo alcune informazioni rapide e facili da consultare. */}
            <span>{recipe.readyInMinutes || 'N/D'} min</span>
            <span>{recipe.servings || 'N/D'} porzioni</span>
            <span>{recipe.vegetarian ? 'Vegetariana' : 'Controlla ingredienti'}</span>
          </div>
          {recipe.summary && (
            <p
              className="detail-summary"
              // L'API restituisce il testo in HTML: per questo lo inseriamo cosi com'e.
              dangerouslySetInnerHTML={{ __html: recipe.summary }}
            />
          )}
        </div>
      </section>

      <section className="detail-grid">
        <div className="detail-card">
          <h3>Ingredienti</h3>
          <ul>
            {recipe.extendedIngredients?.map((ingredient) => (
              // Usiamo id o testo originale come chiave per evitare errori nelle liste.
              <li key={ingredient.id ?? ingredient.original}>
                {ingredient.original}
              </li>
            ))}
          </ul>
        </div>

        <div className="detail-card">
          <h3>Istruzioni</h3>
          {recipe.instructions ? (
            <div
              className="instructions-copy"
              // Anche le istruzioni arrivano gia formattate in HTML.
              dangerouslySetInnerHTML={{ __html: recipe.instructions }}
            />
          ) : (
            <p>Istruzioni non disponibili per questa ricetta.</p>
          )}
        </div>
      </section>
    </article>
  )
}

export default RecipeDetailPage
