'use client'

import { useState } from 'react'

export default function SubmitTicket() {
  const [customer_name, setCustomerName] = useState('')
  const [email, setEmail] = useState('')
  const [ticket_message, setTicketMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await fetch('http://localhost:5678/webhook/support-ticket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer_name,
        email,
        ticket_message,
      }),
    })

    alert('Ticket submitted successfully!')

    setCustomerName('')
    setEmail('')
    setTicketMessage('')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-center mb-2">
          Submit Support Ticket
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Tell us about your issue and our AI support system will review it instantly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              value={customer_name}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Describe Your Issue
            </label>

            <textarea
              value={ticket_message}
              onChange={(e) => setTicketMessage(e.target.value)}
              placeholder="Explain your problem here..."
              rows={6}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            Submit Ticket
          </button>

        </form>
      </div>
    </div>
  )
}