// useState salva il testo digitato dall'utente.
// useEffect sincronizza l'input quando il valore iniziale cambia dall'esterno.
import { useEffect, useState } from 'react'

function SearchBar({ initialValue = '', isLoading = false, onSearch }) {
  // "value" rappresenta il contenuto attuale dell'input.
  const [value, setValue] = useState(initialValue)

  // Se il componente padre cambia initialValue, aggiorniamo il campo di testo.
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  function handleSubmit(event) {
    // Evita il refresh della pagina tipico dei form HTML.
    event.preventDefault()
    // Passa il testo al componente padre, che eseguira la ricerca vera e propria.
    onSearch(value)
  }

  return (
    // Usare un form migliora anche l'accessibilita da tastiera.
    <form className="search-bar" onSubmit={handleSubmit}>
      {/* Etichetta invisibile ma utile per gli screen reader. */}
      <label className="sr-only" htmlFor="recipe-search">
        Search for a vegetarian recipe
      </label>
      <input
        id="recipe-search"
        name="recipe-search"
        type="search"
        value={value}
        // Aggiorniamo lo stato ad ogni modifica dell'utente.
        onChange={(event) => setValue(event.target.value)}
        placeholder="Try: curry, lasagna, tofu, carrot..."
      />
      {/* Durante il loading blocchiamo il pulsante per evitare richieste duplicate. */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  )
}

export default SearchBar
