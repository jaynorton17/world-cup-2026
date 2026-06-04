export default function GlobalChat({ user, firestore }) {
  return (
    <section className="panel chat-panel">
      <div className="chat-placeholder">
        <span className="chat-placeholder-icon">{'\uD83D\uDCAC'}</span>
        <h2 className="chat-placeholder-title">Global Chat</h2>
        <p className="chat-placeholder-text">Chat with all tournament participants. Coming in Phase 2!</p>
      </div>
    </section>
  );
}
