import RecipeGrid from '../components/RecipeGrid'
import SearchBar from '../components/SearchBar'
import StatusMessage from '../components/StatusMessage'
import { useRecipes } from '../hooks/useRecipes'

const suggestions = ['pasta', 'chickpeas burger', 'curry', 'salad', 'soup']

function HomePage() {
  const { error, hasSearched, isLoading, performSearch, recipes, searchTerm } =
    useRecipes()

  return (
    <div className="home-page">
      <section className="hero-panel">
        <div>
          <p className="section-kicker">VEGETARIAN RECIPES BOOK</p>
          <h2>Vegetarian recipes? Ask to Chef Hippo!</h2>
          <p className="section-copy">Search by ingredients or dish:</p>
        </div>

        <SearchBar
          initialValue={searchTerm}
          isLoading={isLoading}
          onSearch={performSearch}
        />

        <div className="suggestions">
          {suggestions.map((suggestion) => (
            <button key={suggestion} type="button" onClick={() => performSearch(suggestion)}>
              {suggestion}
            </button>
          ))}
        </div>
      </section>

      {!hasSearched && (
        <StatusMessage>
          Let&apos;s start your search! A recipe sheet will appear for each result.
          Click to see the detailed description.
        </StatusMessage>
      )}

      {error && <StatusMessage tone="error">{error}</StatusMessage>}

      {hasSearched && !error && (
        <StatusMessage tone="success">
          {recipes.length} vegetarian recipe(s) found for &quot;{searchTerm}&quot;.
        </StatusMessage>
      )}

      {recipes.length > 0 && <RecipeGrid recipes={recipes} />}
    </div>
  )
}

export default HomePage
