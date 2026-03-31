function StatusMessage({ children, tone = 'neutral' }) {
  // Componente riutilizzabile per mostrare messaggi informativi, di errore o di successo.
  // "children" contiene il contenuto da visualizzare.
  // "tone" cambia la classe CSS per modificare il colore del box.
  return <div className={`status-message status-message--${tone}`}>{children}</div>
}

export default StatusMessage
