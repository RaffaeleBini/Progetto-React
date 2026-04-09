import DOMPurify from 'dompurify'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import StatusMessage from '../components/StatusMessage'
import { getRecipeDetails } from '../services/spoonacular'

function RecipeDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadRecipe() {
      try {
        setIsLoading(true)
        setError('')
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
          setIsLoading(false)
        }
      }
    }

    loadRecipe()

    return () => {
      // Evita aggiornamenti di stato se la richiesta finisce dopo lo smontaggio del componente.
      ignore = true
    }
  }, [id])

  const sanitizedSummary = useMemo(
    () => DOMPurify.sanitize(recipe?.summary ?? ''),
    [recipe?.summary],
  )

  const sanitizedInstructions = useMemo(
    () => DOMPurify.sanitize(recipe?.instructions ?? ''),
    [recipe?.instructions],
  )

  if (isLoading) {
    return <StatusMessage>Caricamento della ricetta in corso...</StatusMessage>
  }

  if (error) {
    return <StatusMessage tone="error">{error}</StatusMessage>
  }

  if (!recipe) {
    return (
      <StatusMessage tone="error">
        Ricetta non disponibile. Torna alla home e prova una nuova ricerca.
      </StatusMessage>
    )
  }

  return (
    <article className="detail-page">
      <div className="detail-actions">
        <button type="button" className="ghost-button" onClick={() => navigate(-1)}>
          Torna indietro
        </button>
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
            <span>{recipe.readyInMinutes || 'N/D'} min</span>
            <span>{recipe.servings || 'N/D'} porzioni</span>
            <span>{recipe.vegetarian ? 'Vegetariana' : 'Controlla ingredienti'}</span>
          </div>
          {sanitizedSummary && (
            <p
              className="detail-summary"
              dangerouslySetInnerHTML={{ __html: sanitizedSummary }}
            />
          )}
        </div>
      </section>

      <section className="detail-grid">
        <div className="detail-card">
          <h3>Ingredienti</h3>
          <ul>
            {recipe.extendedIngredients?.map((ingredient) => (
              <li key={ingredient.id ?? ingredient.original}>{ingredient.original}</li>
            ))}
          </ul>
        </div>

        <div className="detail-card">
          <h3>Istruzioni</h3>
          {sanitizedInstructions ? (
            <div
              className="instructions-copy"
              dangerouslySetInnerHTML={{ __html: sanitizedInstructions }}
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
