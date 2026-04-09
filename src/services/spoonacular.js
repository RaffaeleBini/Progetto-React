import axios from 'axios'

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY

const spoonacularApi = axios.create({
  baseURL: 'https://api.spoonacular.com',
})

function ensureApiKey() {
  if (!API_KEY) {
    throw new Error(
      "Chiave API mancante. Aggiungi VITE_SPOONACULAR_API_KEY nel file .env.",
    )
  }
}

function normalizeError(error) {
  if (error.response?.status === 402) {
    return new Error('Quota Spoonacular esaurita. Riprova piu tardi.')
  }

  if (error.response?.status === 401) {
    return new Error('API key non valida. Controlla il file .env.')
  }

  return new Error(
    error.response?.data?.message ||
      'Non sono riuscito a recuperare i dati. Controlla la connessione e riprova.',
  )
}

export async function searchVegetarianRecipes(query) {
  ensureApiKey()

  try {
    const response = await spoonacularApi.get('/recipes/complexSearch', {
      params: {
        addRecipeInformation: true,
        apiKey: API_KEY,
        diet: 'vegetarian',
        instructionsRequired: true,
        number: 12,
        query,
      },
    })

    return response.data
  } catch (error) {
    throw normalizeError(error)
  }
}

export async function getRecipeDetails(id) {
  ensureApiKey()

  try {
    const response = await spoonacularApi.get(`/recipes/${id}/information`, {
      params: {
        apiKey: API_KEY,
        includeNutrition: false,
      },
    })

    return response.data
  } catch (error) {
    throw normalizeError(error)
  }
}
