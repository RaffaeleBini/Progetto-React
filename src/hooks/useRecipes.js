import { useContext } from 'react'
import { RecipesContext } from '../context/recipes-context'

export function useRecipes() {
  const context = useContext(RecipesContext)

  if (!context) {
    throw new Error('useRecipes deve essere usato dentro RecipesProvider.')
  }

  return context
}
