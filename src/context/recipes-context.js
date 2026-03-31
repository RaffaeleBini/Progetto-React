// createContext crea un contenitore condiviso leggibile da piu componenti.
import { createContext } from 'react'

// Il valore iniziale e null: il provider lo sostituira con dati reali.
export const RecipesContext = createContext(null)
