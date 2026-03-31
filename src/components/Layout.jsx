// Outlet e un segnaposto di React Router:
// dentro questo punto verra mostrata la pagina attiva.
import { Outlet } from 'react-router-dom'
// Importiamo la mascotte locale per usarla nell'header.
import chefHippo from '../assets/chefhippo.png'

// Costruzione del Layout, che contiene l'header comune a tutte le pagine e il punto di inserimento per i contenuti specifici.
function Layout() {
  return (
    // app-shell e il contenitore principale dell'intera interfaccia.
    <div className="app-shell">
      {/* Header comune del sito, visibile in tutte le pagine. */}
      <header className="site-header">
        {/* Colonna sinistra: titolo e testo introduttivo. */}
        <div className="site-header__content">
          <div>
            {/* "eyebrow" e una piccola etichetta sopra il titolo principale. */}
            <p className="eyebrow">Vegetarian Recipe Finder</p>
            {/* Titolo principale del sito. */}
            <h1>Chef Hippo</h1>
          </div>
          {/* Breve descrizione del progetto. */}
          <p className="intro-copy">
            The best partner for every vegetarian kitchen
          </p>
        </div>

        {/* Colonna destra: immagine decorativa della mascotte. */}
        <div className="site-header__media">
          <img
            src={chefHippo}
            alt="Chef Hippo, the mascotte"
          />
        </div>
      </header>

      {/* Qui React Router inserira la pagina corrente. */}
      <main className="page-content">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
