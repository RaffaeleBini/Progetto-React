// useContext legge il valore salvato dentro un Context React.
import { useContext } from 'react'
// Importiamo il context dedicato alle ricette.
import { RecipesContext } from '../context/recipes-context'

export function useRecipes() {
  // Recuperiamo il valore fornito dal provider.
  const context = useContext(RecipesContext)

  if (!context) {
    // Protezione utile: il hook funziona solo dentro RecipesProvider.
    throw new Error('useRecipes deve essere usato dentro RecipesProvider.')
  }

  // Restituiamo stato e funzioni pronte da usare.
  return context
}
