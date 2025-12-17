import React from "react";

export default function ApiDocsPage() {
  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1>🚀 Glide Network API — v1</h1>
      <p>
        This documentation describes all available Glide Network API endpoints,
        request/response formats, and webhook structures.
      </p>

      <hr />

      {/* Authentication */}
      <section>
        <h2>🔐 Authentication</h2>
        <p>
          Every request must include your secret token:
        </p>

        <pre>
{`Authorization: Bearer YOUR_API_KEY`}
        </pre>

        <p>
          Replace <code>YOUR_API_KEY</code> with the secret you generated.
        </p>
      </section>

      <hr />

      {/* Create Ride */}
      <section>
        <h2>🆕 POST /api/v1/rides — Create Ride</h2>

        <h3>Request Body</h3>
        <pre>
{`{
  "passengerName": "John Doe",
  "pickup": {
    "lat": 6.5244,
    "lng": 3.3792,
    "address": "Ikeja City Mall"
  },
  "destination": {
    "lat": 6.465422,
    "lng": 3.406448,
    "address": "VI Oniru"
  }
}`}
        </pre>

        <h3>Response</h3>
        <pre>
{`{
  "rideId": "RIDE_234923423",
  "status": "pending",
  "etaDriver": 4
}`}
        </pre>
      </section>

      <hr />

      {/* Get Ride */}
      <section>
        <h2>📍 GET /api/v1/rides/:id — Ride Status</h2>

        <h3>Response</h3>
        <pre>
{`{
  "rideId": "RIDE_234923423",
  "status": "driver_en_route",
  "driver": {
    "name": "Michael",
    "vehicle": "Toyota Corolla",
    "plate": "SMK 223 DF",
    "lat": 6.51,
    "lng": 3.38
  }
}`}
        </pre>
      </section>

      <hr />

      {/* Update Ride (internal) */}
      <section>
        <h2>⚙️ POST /api/v1/rides/:id/update — Internal Update</h2>

        <h3>Request</h3>
        <pre>
{`{
  "status": "arrived",
  "driverLat": 6.5221,
  "driverLng": 3.3789
}`}
        </pre>

        <h3>Response</h3>
        <pre>
{`{ "ok": true }`}
        </pre>
      </section>

      <hr />

      {/* Webhooks */}
      <section>
        <h2>🔔 POST /api/v1/webhook — Wakanow Callback</h2>

        <p>When a ride changes state, Glide sends a webhook to Wakanow.</p>

        <h3>Example Payload</h3>
        <pre>
{`{
  "rideId": "RIDE_234923423",
  "event": "driver_arrived",
  "timestamp": 1732352342,
  "data": {
    "driver": {
      "name": "Michael"
    }
  }
}`}
        </pre>
      </section>

      <hr />

      <p style={{ marginTop: "40px" }}>
        Need help adding testing buttons or live examples? Just tell me — I can generate it.
      </p>
    </div>
  );
}
