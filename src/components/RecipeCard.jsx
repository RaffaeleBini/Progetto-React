// Link permette di cambiare pagina senza ricaricare l'app.
import { Link } from 'react-router-dom'

function RecipeCard({ recipe }) {
  return (
    // article rappresenta una singola scheda ricetta.
    <article className="recipe-card">
      {/* L'intera card e cliccabile e porta alla pagina dettaglio. */}
      <Link to={`/recipe/${recipe.id}`} className="recipe-card__link">
        <img
          className="recipe-card__image"
          src={recipe.image}
          alt={`Picture of ${recipe.title}`}
        />
        <div className="recipe-card__body">
          {/* Piccola etichetta visiva che richiama il focus del sito. */}
          <span className="recipe-chip">Vegetarian</span>
          {/* Titolo della ricetta. */}
          <h3>{recipe.title}</h3>
          <p>
            {/* Se il tempo e disponibile lo mostriamo, altrimenti avvisiamo l'utente. */}
            {recipe.readyInMinutes
              ? `${recipe.readyInMinutes} preparation time (min) `
              : 'Preparation time not available'}
          </p>
        </div>
      </Link>
    </article>
  )
}

export default RecipeCard
