export default function ErrorPage() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Something Went Wrong ⚠️</h1>
      <p>We couldn't confirm your email. Try again or contact support.</p>
      <a href="/auth/login" style={{ color: "#007bff" }}>Return to Login</a>
    </div>
  );
}
