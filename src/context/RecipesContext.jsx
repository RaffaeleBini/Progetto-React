import { useCallback, useMemo, useState } from 'react'
import { RecipesContext } from './recipes-context'
import { searchVegetarianRecipes } from '../services/spoonacular'

export function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  const performSearch = useCallback(async (rawTerm) => {
    const normalizedTerm = rawTerm.trim()

    setSearchTerm(normalizedTerm)
    setHasSearched(true)

    if (!normalizedTerm) {
      setRecipes([])
      setError('Please insert a vegetarian ingredient or dish.')
      return
    }

    try {
      setIsLoading(true)
      setError('')
      const data = await searchVegetarianRecipes(normalizedTerm)
      setRecipes(data.results ?? [])

      if (!data.results?.length) {
        setError('No recipe found. Try a different search.')
      }
    } catch (requestError) {
      setRecipes([])
      setError(requestError.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const value = useMemo(
    () => ({
      error,
      hasSearched,
      isLoading,
      performSearch,
      recipes,
      searchTerm,
      setError,
    }),
    [error, hasSearched, isLoading, performSearch, recipes, searchTerm],
  )

  return <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>
}
