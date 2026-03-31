// RecipeCard e il componente che rappresenta una singola ricetta.
import RecipeCard from './RecipeCard'

function RecipeGrid({ recipes }) {
  return (
    // Questo section raggruppa semanticamente tutti i risultati trovati.
    <section className="recipes-section" aria-label="Search results">
      <div className="recipes-grid">
        {/* Creiamo una card per ogni elemento dell'array recipes. */}
        {recipes.map((recipe) => (
          // key aiuta React a riconoscere ogni elemento della lista.
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </section>
  )
}

export default RecipeGrid
