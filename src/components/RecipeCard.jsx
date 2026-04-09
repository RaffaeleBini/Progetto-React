import { Link } from 'react-router-dom'

function RecipeCard({ recipe }) {
  return (
    <article className="recipe-card">
      <Link to={`/recipe/${recipe.id}`} className="recipe-card__link">
        <img
          className="recipe-card__image"
          src={recipe.image}
          alt={`Picture of ${recipe.title}`}
        />
        <div className="recipe-card__body">
          <span className="recipe-chip">Vegetarian</span>
          <h3>{recipe.title}</h3>
          <p>
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
