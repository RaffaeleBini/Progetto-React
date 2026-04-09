import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="not-found">
      <p className="section-kicker">404</p>
      <h2>La pagina richiesta non esiste.</h2>
      <p>Torna alla home e avvia una nuova ricerca vegetariana.</p>
      <Link to="/" className="ghost-button">
        Vai alla home
      </Link>
    </section>
  )
}

export default NotFoundPage
