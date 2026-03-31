# Veggie Recipes

## Funzionalita principali

- Ricerca di ricette vegetariane tramite Spoonacular.
- Griglia responsive con immagine di copertina e titolo.
- Pagina dettaglio con tempi, porzioni, ingredienti e istruzioni.
- Stato condiviso tramite Context API per risultati, loading ed errori.
- Navigazione con React Router tra home e dettaglio.

## Prototipo rapido

### Home

- Header con titolo del progetto e breve messaggio di supporto.
- Barra di ricerca centrale.
- Sezione introduttiva con suggerimenti di ricerca.
- Griglia di card ricetta.

### Dettaglio ricetta

- Pulsante per tornare alla home.
- Hero con immagine, titolo e meta informazioni.
- Sommario ricetta.
- Lista ingredienti.
- Istruzioni di preparazione.

## Scelte tecniche

- `Vite`: avvio rapido e configurazione minima.
- `React Router`: separa chiaramente home e dettaglio.
- `Axios`: centralizza la comunicazione con Spoonacular.
- `Context API`: evita prop drilling senza introdurre Redux per uno stato globale limitato.
- `recipes/complexSearch` con `diet=vegetarian`: garantisce che i risultati rispettino il vincolo vegetariano.
- `recipes/{id}/information`: recupera i dati completi per la pagina dedicata.
