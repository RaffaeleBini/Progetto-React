// Axios semplifica le chiamate HTTP verso l'API esterna.
import axios from 'axios'

// Vite espone le variabili d'ambiente lato client tramite import.meta.env.
const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY

// Creiamo una istanza Axios con l'URL base di Spoonacular.
const spoonacularApi = axios.create({
  baseURL: 'https://api.spoonacular.com',
})

function ensureApiKey() {
  // Prima di fare qualsiasi richiesta controlliamo se la chiave esiste.
  if (!API_KEY) {
    throw new Error(
      "Chiave API mancante. Aggiungi VITE_SPOONACULAR_API_KEY nel file .env.",
    )
  }
}

function normalizeError(error) {
  // 402 di Spoonacular indica spesso quota giornaliera terminata.
  if (error.response?.status === 402) {
    return new Error('Quota Spoonacular esaurita. Riprova piu tardi.')
  }

  // 401 indica una chiave assente o non valida.
  if (error.response?.status === 401) {
    return new Error('API key non valida. Controlla il file .env.')
  }

  // Negli altri casi mostriamo il messaggio dell'API, se disponibile.
  return new Error(
    error.response?.data?.message ||
      'Non sono riuscito a recuperare i dati. Controlla la connessione e riprova.',
  )
}

export async function searchVegetarianRecipes(query) {
  // Se manca la chiave, interrompiamo subito l'esecuzione.
  ensureApiKey()

  try {
    // complexSearch recupera una lista di ricette filtrate.
    const response = await spoonacularApi.get('/recipes/complexSearch', {
      params: {
        // Chiediamo piu informazioni direttamente nei risultati iniziali.
        addRecipeInformation: true,
        // Spoonacular accetta la chiave API come parametro.
        apiKey: API_KEY,
        // Questo filtro garantisce che i risultati siano vegetariani.
        diet: 'vegetarian',
        // Mostriamo solo ricette con istruzioni disponibili.
        instructionsRequired: true,
        // Limitiamo il numero di risultati per mantenere la UI ordinata.
        number: 12,
        // Testo digitato dall'utente.
        query,
      },
    })

    // Restituiamo solo il corpo della risposta.
    return response.data
  } catch (error) {
    // Convertiamo l'errore tecnico in un messaggio piu leggibile.
    throw normalizeError(error)
  }
}

export async function getRecipeDetails(id) {
  // Anche qui verifichiamo la presenza della chiave API.
  ensureApiKey()

  try {
    // Questo endpoint recupera tutti i dettagli di una singola ricetta.
    const response = await spoonacularApi.get(`/recipes/${id}/information`, {
      params: {
        apiKey: API_KEY,
        // In questa app non mostriamo il pannello nutrizionale completo.
        includeNutrition: false,
      },
    })

    return response.data
  } catch (error) {
    throw normalizeError(error)
  }
}
