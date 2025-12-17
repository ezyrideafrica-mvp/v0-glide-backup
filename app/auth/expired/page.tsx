export default function ExpiredPage() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Link Expired ❌</h1>
      <p>Your confirmation link has expired or was already used.</p>
      <p>You can request a new confirmation email.</p>
      <a href="/auth/resend" style={{ color: "#007bff" }}>Resend Email</a>
    </div>
  );
}
