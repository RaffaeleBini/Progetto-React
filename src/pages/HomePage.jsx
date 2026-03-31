// Componenti usati per costruire la home page.
import RecipeGrid from '../components/RecipeGrid'
import SearchBar from '../components/SearchBar'
import StatusMessage from '../components/StatusMessage'
// Custom hook per leggere lo stato globale delle ricette.
import { useRecipes } from '../hooks/useRecipes'

// Suggerimenti rapidi per aiutare l'utente a iniziare la ricerca.
const suggestions = ['pasta', 'cheackpeas burger', 'curry', 'salad', 'soup']

function HomePage() {
  // Qui estraiamo dal context tutto cio che serve alla home.
  const { error, hasSearched, isLoading, performSearch, recipes, searchTerm } =
    useRecipes()

  return (
    <div className="home-page">
      {/* Hero iniziale con titolo, spiegazione e form di ricerca. */}
      <section className="hero-panel">
        <div>
          <p className="section-kicker">VEGETARIAN RECIPES BOOK</p>
          <h2>Vegetarian recipes? Ask to Chef Hippo!</h2>
          <p className="section-copy">
            Search by ingredients or dish:
          </p>
        </div>

        {/* SearchBar riceve il valore corrente, lo stato loading e la funzione di ricerca. */}
        <SearchBar
          initialValue={searchTerm}
          isLoading={isLoading}
          onSearch={performSearch}
        />

        <div className="suggestions">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              // Un clic sul suggerimento avvia subito la ricerca relativa.
              onClick={() => performSearch(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </section>

      {/* Messaggio iniziale mostrato prima della prima ricerca. */}
      {!hasSearched && (
        <StatusMessage>
          Let's start your search! A recipe sheet will appear for each result.
          Click to see the detailed description.
        </StatusMessage>
      )}

      {/* Se esiste un errore, lo mostriamo con uno stile dedicato. */}
      {error && <StatusMessage tone="error">{error}</StatusMessage>}

      {/* Se la ricerca ha avuto successo, mostriamo un riepilogo del numero di risultati. */}
      {hasSearched && !error && (
        <StatusMessage tone="success">
          {recipes.length} vegetarian recipe(s) found for "{searchTerm}".
        </StatusMessage>
      )}

      {/* La griglia appare solo quando esistono davvero delle ricette da mostrare. */}
      {recipes.length > 0 && <RecipeGrid recipes={recipes} />}
    </div>
  )
}

export default HomePage
