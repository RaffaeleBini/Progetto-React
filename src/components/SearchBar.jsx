import { useEffect, useState } from 'react'

function SearchBar({ initialValue = '', isLoading = false, onSearch }) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  function handleSubmit(event) {
    event.preventDefault()
    onSearch(value)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="recipe-search">
        Search for a vegetarian recipe
      </label>
      <input
        id="recipe-search"
        name="recipe-search"
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Try: curry, lasagna, tofu, carrot..."
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  )
}

export default SearchBar
