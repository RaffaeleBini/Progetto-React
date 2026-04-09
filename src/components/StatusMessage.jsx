function StatusMessage({ children, tone = 'neutral' }) {
  return <div className={`status-message status-message--${tone}`}>{children}</div>
}

export default StatusMessage
