"use client"

import React from "react"
import { Card } from "@/components/ui/card"
// Separator component removed — using native <hr /> instead

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen px-6 py-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-primary mb-4">Glide API Documentation</h1>
      <p className="text-gray-600 mb-8">
        This is the official API for integrating with Glide for airport ride bookings.
        External partners like <strong>Wakanow</strong> use this endpoint to send ride requests.
      </p>

      {/* BASE URL */}
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-2">Base URL</h2>
        <hr className="my-3 border-t border-gray-200 dark:border-gray-700" />
        <code className="bg-gray-900 text-white px-3 py-2 rounded block">
          https://api.glidenetwork.biz/v1
        </code>
      </Card>

      {/* AUTH SECTION */}
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-2">Authentication</h2>
        <hr className="my-3 border-t border-gray-200 dark:border-gray-700" />
        <p className="text-gray-600 mb-3">
          All requests must include a Glide API Key in the header:
        </p>

        <code className="bg-gray-900 text-white px-3 py-2 rounded block mb-3">
{`Authorization: Bearer YOUR_API_KEY`}
        </code>

        <p className="text-sm text-gray-500">
          Contact Glide support to obtain your partner API key.
        </p>
      </Card>

      {/* ENDPOINTS */}
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-2">Endpoints</h2>
        <hr className="my-3 border-t border-gray-200 dark:border-gray-700" />

        {/* Create Ride */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold">POST /rides</h3>
          <p className="text-gray-600 mb-2">Creates a new airport ride booking.</p>

          <code className="bg-gray-900 text-white px-3 py-2 rounded block mb-3">
{`POST https://api.glidenetwork.biz/v1/rides`}
          </code>

          <strong>Request Body</strong>
          <pre className="bg-gray-800 text-green-300 rounded p-4 text-sm mt-2">
{`{
  "passengerName": "John Doe",
  "pickupAirport": "LOS",
  "pickupTime": "2025-01-15T14:30:00Z",
  "flightNumber": "ET901",
  "destination": "Lekki Phase 1",
  "notes": "VIP passenger"
}`}
          </pre>
        </div>

        {/* Ride Status */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold">GET /rides/:id</h3>
          <p className="text-gray-600 mb-2">Retrieve the current status of a ride.</p>

          <code className="bg-gray-900 text-white px-3 py-2 rounded block">
{`GET https://api.glidenetwork.biz/v1/rides/12345`}
          </code>
        </div>

        {/* Internal update */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold">POST /rides/:id/update</h3>
          <p className="text-gray-600 mb-2">Internal use — status updates.</p>

          <pre className="bg-gray-800 text-green-300 rounded p-4 text-sm">
{`{
  "status": "driver_assigned"
}`}
          </pre>
        </div>

        {/* Webhook */}
        <div>
          <h3 className="text-xl font-semibold">POST /webhook</h3>
          <p className="text-gray-600 mb-2">
            Wakanow receives callbacks for ride progress updates.
          </p>

          <pre className="bg-gray-800 text-green-300 rounded p-4 text-sm">
{`{
  "event": "driver_en_route",
  "rideId": "12345",
  "timestamp": "2025-01-15T14:33:00Z"
}`}
          </pre>
        </div>
      </Card>
    </div>
  )
}
