import RecipeCard from './RecipeCard'

function RecipeGrid({ recipes }) {
  return (
    <section className="recipes-section" aria-label="Search results">
      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </section>
  )
}

export default RecipeGrid
